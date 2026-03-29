import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, company, service, budget, message } = data;

    if (!name || !email || !service || !budget || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data: resendData, error } = await resend.emails.send({
      from: "LevelOne Agency <onboarding@resend.dev>", // Or update to verified domain like hello@leveloneagency.co.uk later
      to: process.env.CONTACT_EMAIL || "hello@leveloneagency.co.uk",
      subject: `New Project Inquiry from ${name} (${company || "N/A"})`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Service Needed:</strong> ${service}</p>
        <p><strong>Budget Range:</strong> ${budget}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
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
