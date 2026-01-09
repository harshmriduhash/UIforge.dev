// Simple email sending utility
// In production, use a service like SendGrid, Resend, or AWS SES

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  // In production, implement actual email sending
  // For now, just log in development
  if (process.env.NODE_ENV === "development") {
    console.log("Email would be sent:", { to, subject });
  }

  // Example with nodemailer (uncomment and configure):
  /*
  const nodemailer = require("nodemailer");
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    html,
  });
  */
}
