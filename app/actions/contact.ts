"use server";

import nodemailer from "nodemailer";
import { contactSchema, type ContactFormData } from "@/lib/utils/validation";

export async function sendContactEmail(data: ContactFormData) {
  // Validate on server side
  const validated = contactSchema.safeParse(data);
  if (!validated.success) {
    return { 
      success: false, 
      error: validated.error.issues.map((issue) => issue.message).join(", ") 
    };
  }

  const { name, email, message } = validated.data;

  // Setup transporter configuration from env vars
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      subject: `New Message from ${name} via Portfolio`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 40px; background-color: #000; color: #fff; max-width: 600px; margin: auto; border-radius: 12px; border: 1px solid #1a1a1a;">
          <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 24px; letter-spacing: -0.05em; border-bottom: 1px solid #1a1a1a; padding-bottom: 12px;">NEW MESSAGE</h2>
          <div style="margin-bottom: 20px;">
            <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.4); margin-bottom: 4px;">From</p>
            <p style="font-size: 16px; margin: 0; font-weight: bold;">${name} (${email})</p>
          </div>
          <div style="margin-bottom: 20px; background: rgba(255,255,255,0.03); padding: 24px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
            <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.4); margin-bottom: 12px;">Inquiry Detail</p>
            <p style="font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap; color: rgba(255,255,255,0.8);">${message}</p>
          </div>
          <p style="font-size: 10px; color: rgba(255,255,255,0.2); text-align: center; margin-top: 40px; text-transform: uppercase; letter-spacing: 0.3em;">Sent via Rabka Portfolio Website</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email sending failure:", error);
    return { 
      success: false, 
      error: "Service temporarily unavailable. Please try again later." 
    };
  }
}
