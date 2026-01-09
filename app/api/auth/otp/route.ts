import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

// In production, store OTPs in Redis or database with expiration
const otpStore = new Map<string, { code: string; expiresAt: number }>();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store OTP
    otpStore.set(email, { code: otp, expiresAt });

    // Send email (in production, use a proper email service)
    try {
      await sendEmail({
        to: email,
        subject: "Your UIForge Login Code",
        html: `
          <h1>Your login code</h1>
          <p>Your verification code is: <strong>${otp}</strong></p>
          <p>This code will expire in 10 minutes.</p>
        `,
      });
    } catch (error) {
      console.error("Email send error:", error);
      // In development, log the OTP
      if (process.env.NODE_ENV === "development") {
        console.log(`OTP for ${email}: ${otp}`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("OTP generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate OTP" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  if (!email || !code) {
    return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
  }

  const stored = otpStore.get(email);
  if (!stored) {
    return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 });
  }

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(email);
    return NextResponse.json({ error: "Code expired" }, { status: 400 });
  }

  if (stored.code !== code) {
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });
  }

  // Code is valid, clean up
  otpStore.delete(email);
  return NextResponse.json({ valid: true });
}
