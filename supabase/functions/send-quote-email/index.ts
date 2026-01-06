import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteRequest {
  fullName: string;
  email: string;
  phone: string;
  serviceRequested: string;
  propertyType?: string;
  addressOrNeighborhood?: string;
  preferredContactMethod?: string;
  additionalDetails?: string;
  imageNames?: string[];
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-quote-email function invoked");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: QuoteRequest = await req.json();
    console.log("Received quote data:", { fullName: data.fullName, email: data.email });

    const {
      fullName,
      email,
      phone,
      serviceRequested,
      propertyType,
      addressOrNeighborhood,
      preferredContactMethod,
      additionalDetails,
      imageNames,
    } = data;

    // Validate required fields
    if (!fullName || !email || !phone || !serviceRequested) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields: fullName, email, phone, serviceRequested" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase client with service role for admin access
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Prepare extra data for images
    const extraData = imageNames && imageNames.length > 0 
      ? { pending_image_filenames: imageNames }
      : null;

    // Insert quote into database
    const { data: insertedQuote, error: insertError } = await supabase
      .from("quotes")
      .insert({
        full_name: fullName,
        email: email,
        phone: phone,
        service_requested: serviceRequested,
        address_or_neighborhood: addressOrNeighborhood || null,
        property_type: propertyType || null,
        preferred_contact_method: preferredContactMethod || null,
        additional_details: additionalDetails || null,
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

    // Build email HTML
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
              <td style="padding: 8px 0; font-weight: 500;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2d5a27; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;">Phone:</td>
              <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #2d5a27; text-decoration: none;">${phone}</a></td>
            </tr>
            ${preferredContactMethod ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Preferred Contact:</td>
              <td style="padding: 8px 0;">${preferredContactMethod}</td>
            </tr>
            ` : ''}
          </table>

          <h2 style="color: #2d5a27; margin-top: 25px; font-size: 18px; border-bottom: 2px solid #2d5a27; padding-bottom: 10px;">Project Details</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 140px;">Service:</td>
              <td style="padding: 8px 0; font-weight: 500;">${serviceRequested}</td>
            </tr>
            ${propertyType ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Property Type:</td>
              <td style="padding: 8px 0;">${propertyType}</td>
            </tr>
            ` : ''}
            ${addressOrNeighborhood ? `
            <tr>
              <td style="padding: 8px 0; color: #666;">Location:</td>
              <td style="padding: 8px 0;">${addressOrNeighborhood}</td>
            </tr>
            ` : ''}
          </table>

          ${additionalDetails ? `
          <h2 style="color: #2d5a27; margin-top: 25px; font-size: 18px; border-bottom: 2px solid #2d5a27; padding-bottom: 10px;">Additional Notes</h2>
          <p style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e0e7e0; margin: 0;">${additionalDetails}</p>
          ` : ''}

          ${imageNames && imageNames.length > 0 ? `
          <h2 style="color: #2d5a27; margin-top: 25px; font-size: 18px; border-bottom: 2px solid #2d5a27; padding-bottom: 10px;">Attached Images</h2>
          <p style="color: #666; margin: 0;">${imageNames.length} image(s) attached: ${imageNames.join(', ')}</p>
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

    // Send email notification
    const emailResponse = await resend.emails.send({
      from: "Terralux Landscape <info@terraluxlandscape.ca>",
      to: ["terraluxlandscape@gmail.com"],
      subject: `New Quote Request – #${quoteNumber}`,
      html: emailHtml,
    });

    console.log("Email response:", emailResponse);

    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      // Quote is saved, but email failed - still return success with warning
      return new Response(
        JSON.stringify({ 
          success: true, 
          quoteNumber,
          emailSent: false,
          warning: "Quote saved but email notification failed"
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        quoteNumber,
        emailSent: true,
        emailId: emailResponse.data?.id 
      }),
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
