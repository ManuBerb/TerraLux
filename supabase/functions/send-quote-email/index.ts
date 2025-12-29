import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Use service role key to bypass RLS
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteFormRequest {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  address?: string;
  propertyType?: string;
  contactMethod?: string;
  details?: string;
  imageNames?: string[];
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-quote-email function invoked");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: QuoteFormRequest = await req.json();
    
    console.log("Received quote request:", {
      fullName: payload.fullName,
      email: payload.email?.substring(0, 3) + "***",
      phone: payload.phone?.substring(0, 3) + "***",
      service: payload.service,
    });

    // Step 1: Insert into quotes table using service role (bypasses RLS)
    const { data: insertedQuote, error: insertError } = await supabase
      .from("quotes")
      .insert({
        full_name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        service_requested: payload.service,
        address_or_neighborhood: payload.address || null,
        property_type: payload.propertyType || null,
        preferred_contact_method: payload.contactMethod || null,
        additional_details: payload.details || null,
        extra: payload.imageNames?.length ? { pending_image_filenames: payload.imageNames } : null,
      })
      .select("quote_number")
      .single();

    if (insertError) {
      console.error("Database insert failed:", insertError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Database error: ${insertError.message}`,
          code: insertError.code 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const quoteNumber = insertedQuote.quote_number;
    console.log("Quote inserted successfully, quote_number:", quoteNumber);

    // Step 2: Send email notification (don't fail if this fails)
    let emailSent = false;
    try {
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
                <td style="padding: 8px 0; font-weight: 500;">${payload.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${payload.email}" style="color: #2d5a27; text-decoration: none;">${payload.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Phone:</td>
                <td style="padding: 8px 0;"><a href="tel:${payload.phone}" style="color: #2d5a27; text-decoration: none;">${payload.phone}</a></td>
              </tr>
              ${payload.contactMethod ? `
              <tr>
                <td style="padding: 8px 0; color: #666;">Preferred Contact:</td>
                <td style="padding: 8px 0;">${payload.contactMethod}</td>
              </tr>
              ` : ''}
            </table>

            <h2 style="color: #2d5a27; margin-top: 25px; font-size: 18px; border-bottom: 2px solid #2d5a27; padding-bottom: 10px;">Project Details</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 140px;">Service:</td>
                <td style="padding: 8px 0; font-weight: 500;">${payload.service}</td>
              </tr>
              ${payload.propertyType ? `
              <tr>
                <td style="padding: 8px 0; color: #666;">Property Type:</td>
                <td style="padding: 8px 0;">${payload.propertyType}</td>
              </tr>
              ` : ''}
              ${payload.address ? `
              <tr>
                <td style="padding: 8px 0; color: #666;">Location:</td>
                <td style="padding: 8px 0;">${payload.address}</td>
              </tr>
              ` : ''}
            </table>

            ${payload.details ? `
            <h2 style="color: #2d5a27; margin-top: 25px; font-size: 18px; border-bottom: 2px solid #2d5a27; padding-bottom: 10px;">Additional Notes</h2>
            <p style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e0e7e0; margin: 0;">${payload.details}</p>
            ` : ''}

            ${payload.imageNames && payload.imageNames.length > 0 ? `
            <h2 style="color: #2d5a27; margin-top: 25px; font-size: 18px; border-bottom: 2px solid #2d5a27; padding-bottom: 10px;">Attached Images</h2>
            <p style="color: #666; margin: 0;">${payload.imageNames.length} image(s) attached: ${payload.imageNames.join(', ')}</p>
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
        reply_to: payload.email,
        subject: `New Quote Request – #${quoteNumber} from ${payload.fullName}`,
        html: emailHtml,
      });

      if (emailResponse.error) {
        console.error("Email send failed (Resend error):", emailResponse.error);
      } else {
        emailSent = true;
        console.log("Email sent successfully:", emailResponse.data?.id);
      }
    } catch (emailError: any) {
      console.error("Email send failed (exception):", emailError.message);
      // Don't return error - DB insert succeeded
    }

    // Return success with quote number (regardless of email status)
    return new Response(
      JSON.stringify({ 
        success: true, 
        quote_number: quoteNumber,
        email_sent: emailSent
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in send-quote-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
