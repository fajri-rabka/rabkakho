"use server";

import nodemailer from "nodemailer";
import { contactSchema, type ContactFormData } from "@/lib/utils/validation";

async function verifyTurnstile(token: string) {
  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
      },
    );

    const outcome = await response.json();
    return outcome.success;
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return false;
  }
}

export async function sendContactEmail(data: ContactFormData) {
  // Validate on server side
  const validated = contactSchema.safeParse(data);
  if (!validated.success) {
    return {
      success: false,
      error: validated.error.issues.map((issue) => issue.message).join(", "),
    };
  }

  const { name, email, message, turnstileToken } = validated.data;

  // Verify Turnstile
  let isHuman = false;

  if (process.env.NODE_ENV === "development") {
    console.log("Skipping Turnstile (DEV)");
    isHuman = true;
  } else {
    isHuman = await verifyTurnstile(turnstileToken);
  }

  if (!isHuman) {
    return {
      success: false,
      error: "Security verification failed. Please try again.",
    };
  }

  // Setup transporter configuration (Gmail SMTP)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Send email to yourself
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio: New message from ${name}`,
      text: `Inquiry from: ${name} (${email})\n\nMessage:\n${message}`,
      html: `
        <div style="margin:0; padding:40px 16px; background-color:#0b0b0b; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; color:#ffffff;">
          <div style="max-width:560px; margin:0 auto; background:#111111; border:1px solid #1f1f1f; border-radius:14px; overflow:hidden;">
        
          <div style="padding:28px 28px 20px 28px;">
            <p style="margin:0 0 6px 0; font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(255,255,255,0.35);">
              New Message
            </p>
            <h1 style="margin:0; font-size:20px; font-weight:700; letter-spacing:-0.01em;">
              Rabka Portfolio
            </h1>
          </div>

          <div style="height:1px; background:#1f1f1f;"></div>

          <div style="padding:28px;">
            
            <div style="margin-bottom:24px;">
              <p style="margin:0 0 6px 0; font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:rgba(255,255,255,0.35);">
                From
              </p>
              <p style="margin:0; font-size:15px; font-weight:500; color:#ffffff;">
                ${name}
              </p>
              <p style="margin:2px 0 0 0; font-size:13px; color:rgba(255,255,255,0.6);">
                ${email}
              </p>
            </div>

            <div style="border:1px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); border-radius:10px; padding:20px;">
              <p style="margin:0 0 10px 0; font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:rgba(255,255,255,0.35);">
                Message
              </p>
              <p style="margin:0; font-size:14px; line-height:1.6; color:rgba(255,255,255,0.85);">
                ${message}
              </p>
            </div>

            <a href="mailto:${email}" 
              style="display:inline-block; margin-top:20px; padding:10px 16px; border-radius:8px; background:#ffffff; color:#000; text-decoration:none; font-size:12px; font-weight:600;">
              Reply to Sender
            </a>

            <p style="font-size:11px; color:rgba(255,255,255,0.4); margin-top:16px;">
              Received at: ${new Date().toLocaleString()}
            </p>

          </div>

          <div style="padding:20px 28px; border-top:1px solid #1f1f1f;">
            <p style="margin:0; font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.25); text-align:center;">
              Message Received
            </p>
          </div>

        </div>
      </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Critical: Email service failed:", error);
    return {
      success: false,
      error: "Oops! Something went wrong. Please try again in a moment.",
    };
  }
}
