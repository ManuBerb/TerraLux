import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
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

const RATE_LIMIT_CONTACT = 10;
const WINDOW_MINUTES = 60;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Honeypot check
    if (body._hp) {
      // Silently reject bot submissions
      return new Response(JSON.stringify({ success: true }), {
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

    if ((count ?? 0) >= RATE_LIMIT_CONTACT) {
      return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await supabaseAdmin.from("rate_limits").insert({ ip });
    // --- End Rate Limiting ---

    // Extract only expected fields
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const message = String(body.message || "").trim();

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Length limits
    if (name.length > 100) {
      return new Response(JSON.stringify({ error: "Name is too long (max 100)" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    if (email.length > 255 || !EMAIL_REGEX.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    if (phone.length > 20) {
      return new Response(JSON.stringify({ error: "Phone number is too long (max 20)" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }
    if (message.length > 5000) {
      return new Response(JSON.stringify({ error: "Message is too long (max 5000)" }), { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } });
    }

    // Escape for HTML email
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    console.log("Received contact form submission:", { name: safeName, email: safeEmail });

    const emailResponse = await resend.emails.send({
      from: "Terralux Landscape <info@terraluxlandscape.ca>",
      to: ["terraluxlandscape@gmail.com"],
      reply_to: email,
      subject: `New Contact Form Submission from ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d5a27; border-bottom: 2px solid #2d5a27; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> ${safePhone || "Not provided"}</p>
          </div>
          
          <div style="background-color: #fff; border-left: 4px solid #2d5a27; padding: 15px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Message:</h3>
            <p style="color: #555; line-height: 1.6;">${safeMessage}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 30px;">
            This email was sent from the Terralux Landscape website contact form.
            <br>You can reply directly to this email to respond to ${safeName}.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      return new Response(
        JSON.stringify({ error: emailResponse.error.message || "Failed to send email" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(JSON.stringify({ success: true, id: emailResponse.data?.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
