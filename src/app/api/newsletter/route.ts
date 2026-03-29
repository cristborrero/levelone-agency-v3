import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

  try {
    const data = await request.json();
    const { email } = data;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const { data: resendData, error } = await resend.emails.send({
      from: "LevelOne Agency <onboarding@resend.dev>", // Or update to verified domain like hello@leveloneagency.co.uk later
      to: process.env.CONTACT_EMAIL || "hello@leveloneagency.co.uk",
      subject: `New Newsletter Subscription`,
      html: `
        <h2>New Newsletter Subscription</h2>
        <p>A new user has subscribed to the monthly digest.</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
      replyTo: email,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: resendData });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
