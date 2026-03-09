import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://terraluxlandscape.ca",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_SERVICES = [
  "Lawn Mowing & Edging",
  "Overseeding",
  "Flower Bed Installations",
  "Hedging",
  "Leaf Removal & Raking",
  "Mulch Beds",
  "Sod Installation",
  "Window Cleaning",
  "Pressure Washing & Sanding",
  "Multiple Services",
];

const RATE_LIMIT_QUOTE = 3;
const WINDOW_MINUTES = 60;

const handler = async (req: Request): Promise<Response> => {
  console.log("send-quote-email function invoked");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Honeypot check
    if (body.website_url) {
      return new Response(JSON.stringify({ success: true, quoteNumber: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // --- Rate Limiting ---
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();

    const { count } = await supabaseAdmin
      .from("rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("ip", ip)
      .gte("created_at", windowStart);

    if ((count ?? 0) >= RATE_LIMIT_QUOTE) {
      return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await supabaseAdmin.from("rate_limits").insert({ ip });
    // --- End Rate Limiting ---

    // Extract and sanitize fields
    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const serviceRequested = String(body.serviceRequested || "").trim();
    const propertyType = body.propertyType ? String(body.propertyType).trim() : null;
    const addressOrNeighborhood = body.addressOrNeighborhood ? String(body.addressOrNeighborhood).trim() : null;
    const preferredContactMethod = body.preferredContactMethod ? String(body.preferredContactMethod).trim() : null;
    const additionalDetails = body.additionalDetails ? String(body.additionalDetails).trim() : null;
    const imagePaths: string[] = Array.isArray(body.imagePaths)
      ? body.imagePaths.filter((p: unknown) => typeof p === "string").slice(0, 3)
      : [];

    // Validate required fields
    if (!fullName || !email || !phone || !serviceRequested) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: fullName, email, phone, serviceRequested" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Length limits
    if (fullName.length > 100) {
      return new Response(JSON.stringify({ error: "Name is too long (max 100)" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    if (email.length > 255 || !EMAIL_REGEX.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    if (phone.length > 20) {
      return new Response(JSON.stringify({ error: "Phone is too long (max 20)" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    if (!ALLOWED_SERVICES.includes(serviceRequested)) {
      return new Response(JSON.stringify({ error: "Invalid service requested" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    if (addressOrNeighborhood && addressOrNeighborhood.length > 500) {
      return new Response(JSON.stringify({ error: "Address is too long (max 500)" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    if (additionalDetails && additionalDetails.length > 2000) {
      return new Response(JSON.stringify({ error: "Details are too long (max 2000)" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    const extraData = imagePaths.length > 0 ? { image_paths: imagePaths } : null;

    // Generate signed URLs for images (private bucket)
    const imageUrls: string[] = [];
    for (const path of imagePaths) {
      const { data: signedData, error: signError } = await supabaseAdmin
        .storage
        .from("quotes")
        .createSignedUrl(path, 60 * 60 * 24 * 7); // 7-day expiry
      if (!signError && signedData?.signedUrl) {
        imageUrls.push(signedData.signedUrl);
      }
    }

    // Insert quote into database
    const { data: insertedQuote, error: insertError } = await supabaseAdmin
      .from("quotes")
      .insert({
        full_name: fullName,
        email,
        phone,
        service_requested: serviceRequested,
        address_or_neighborhood: addressOrNeighborhood,
        property_type: propertyType,
        preferred_contact_method: preferredContactMethod,
        additional_details: additionalDetails,
        extra: extraData,
      })
      .select("quote_number")
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to save quote: " + insertError.message }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const quoteNumber = insertedQuote.quote_number;
    console.log("Quote saved with number:", quoteNumber);

    // Escape user inputs for HTML email
    const safeName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeService = escapeHtml(serviceRequested);
    const safePropertyType = propertyType ? escapeHtml(propertyType) : null;
    const safeAddress = addressOrNeighborhood ? escapeHtml(addressOrNeighborhood) : null;
    const safeContactMethod = preferredContactMethod ? escapeHtml(preferredContactMethod) : null;
    const safeDetails = additionalDetails ? escapeHtml(additionalDetails) : null;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #2d5a27 0%, #4a7c43 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Quote Request</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 32px; font-weight: bold;">#${quoteNumber}</p>
        </div>
        
        <div style="background: #f8faf8; padding: 30px; border: 1px solid #e0e7e0; border-top: none;">
          <h2 style="color: #2d5a27; margin-top: 0; font-size: 18px; border-bottom: 2px solid #2d5a27; padding-bottom: 10px;">Customer Information</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;">Name:</td>
              <td style="padding: 8px 0; font-weight: 500;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #2d5a27; text-decoration: none;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Phone:</td>
              <td style="padding: 8px 0;"><a href="tel:${safePhone}" style="color: #2d5a27; text-decoration: none;">${safePhone}</a></td>
            </tr>
            ${safeContactMethod ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Preferred Contact:</td>
              <td style="padding: 8px 0;">${safeContactMethod}</td>
            </tr>
            ` : ''}
          </table>

          <h2 style="color: #2d5a27; margin-top: 25px; font-size: 18px; border-bottom: 2px solid #2d5a27; padding-bottom: 10px;">Project Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;">Service:</td>
              <td style="padding: 8px 0; font-weight: 500;">${safeService}</td>
            </tr>
            ${safePropertyType ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Property Type:</td>
              <td style="padding: 8px 0;">${safePropertyType}</td>
            </tr>
            ` : ''}
            ${safeAddress ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Location:</td>
              <td style="padding: 8px 0;">${safeAddress}</td>
            </tr>
            ` : ''}
          </table>

          ${safeDetails ? `
          <h2 style="color: #2d5a27; margin-top: 25px; font-size: 18px; border-bottom: 2px solid #2d5a27; padding-bottom: 10px;">Additional Notes</h2>
          <p style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e0e7e0; margin: 0;">${safeDetails}</p>
          ` : ''}

          ${imageUrls.length > 0 ? `
          <h2 style="color: #2d5a27; margin-top: 25px; font-size: 18px; border-bottom: 2px solid #2d5a27; padding-bottom: 10px;">Attached Images (${imageUrls.length})</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 15px;">
            ${imageUrls.map((url, i) => `
              <a href="${url}" target="_blank" style="display: inline-block; text-decoration: none;">
                <img src="${url}" alt="Photo ${i + 1}" style="max-width: 180px; max-height: 180px; border-radius: 8px; border: 1px solid #e0e7e0; object-fit: cover;" />
              </a>
            `).join('')}
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 8px;">⏳ Image links expire in 7 days.</p>
          ` : ''}
        </div>

        <div style="background: #2d5a27; padding: 20px; border-radius: 0 0 12px 12px; text-align: center;">
          <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 14px;">
            Terralux Landscape Inc. • Quote Management System
          </p>
        </div>
      </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Terralux Landscape <info@terraluxlandscape.ca>",
      to: ["terraluxlandscape@gmail.com"],
      subject: `New Quote Request – #${quoteNumber}`,
      html: emailHtml,
    });

    console.log("Email response:", emailResponse);

    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      return new Response(
        JSON.stringify({ success: true, quoteNumber, emailSent: false, warning: "Quote saved but email notification failed" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, quoteNumber, emailSent: true, emailId: emailResponse.data?.id }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-quote-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
