import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store OTP in database
    await prisma.verificationToken.upsert({
      where: {
        identifier_token: {
          identifier: email,
          token: otp,
        },
      },
      update: {
        token: otp,
        expires: expiresAt,
      },
      create: {
        identifier: email,
        token: otp,
        expires: expiresAt,
      },
    });

    // Send email
    try {
      await sendEmail({
        to: email,
        subject: "Your Glint Login Code",
        html: `
          <h1>Your login code</h1>
          <p>Your verification code is: <strong>${otp}</strong></p>
          <p>This code will expire in 10 minutes.</p>
        `,
      });
    } catch (error) {
      console.error("Email send error:", error);
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

  const stored = await prisma.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier: email,
        token: code,
      },
    },
  });

  if (!stored) {
    return NextResponse.json({ error: "Invalid or expired code" }, { status: 400 });
  }

  if (new Date() > stored.expires) {
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token: code,
        },
      },
    });
    return NextResponse.json({ error: "Code expired" }, { status: 400 });
  }

  // Code is valid, clean up
  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: email,
        token: code,
      },
    },
  });
  return NextResponse.json({ valid: true });
}

