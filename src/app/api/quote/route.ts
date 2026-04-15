import { NextResponse } from "next/server";
import { Resend } from "resend";

// Helper to format currency
const formatCurrency = (num: number) => {
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        maximumFractionDigits: 0,
    }).format(num);
};

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');
  
  try {
    const data = await request.json();
    const { 
        service, 
        features, 
        timeline, 
        notes, 
        name, 
        email, 
        company, 
        calculatedEstimate 
    } = data;

    if (!name || !email || !service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const isRetainer = calculatedEstimate.type === 'retainer';
    const estimateLabel = isRetainer ? "Estimated Monthly Retainer" : "Estimated Investment";
    const estimateValue = `${formatCurrency(calculatedEstimate.min)} - ${formatCurrency(calculatedEstimate.max)} ${isRetainer ? '/mo' : ''}`;

    // 1. Email to Agency (Contains exact numbers)
    const { error: agencyError } = await resend.emails.send({
      from: "LevelOne Agency <onboarding@resend.dev>", // TODO: verified domain
      to: process.env.CONTACT_EMAIL || "hello@leveloneagency.co.uk",
      subject: `[QUOTE CALCULATOR] Qualified Lead: ${name} (${company || "N/A"})`,
      html: `
        <h2>New Quote Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <hr/>
        <h3>Project Details:</h3>
        <p><strong>Primary Service:</strong> ${service}</p>
        <p><strong>Features Needed:</strong> ${features?.length > 0 ? features.join(", ") : "None specified"}</p>
        <p><strong>Timeline Request:</strong> ${timeline}</p>
        <hr/>
        <h3 style="color: #6366f1;">Estimated Calculation (Pre-qualified):</h3>
        <p><strong>${estimateLabel}:</strong> <span style="font-size: 1.25rem; font-weight: bold;">${estimateValue}</span></p>
        <hr/>
        <h3>Additional Context/Notes:</h3>
        <p>${notes?.replace(/\n/g, "<br>") || "None provided"}</p>
      `,
      replyTo: email,
    });

    if (agencyError) {
      console.error("Resend API error (Agency):", agencyError);
      return NextResponse.json({ error: agencyError }, { status: 400 });
    }

    // 2. Auto-responder to Client (Acknowledges scope, NO PRICING INFO)
    const { error: clientError } = await resend.emails.send({
        from: "LevelOne Agency <onboarding@resend.dev>", // TODO: verified domain
        to: email,
        subject: `Your Project Enquiry Received - LevelOne Agency`,
        html: `
          <p>Hi ${name.split(' ')[0]},</p>
          <p>This is a quick note to confirm we've received your project details via our Interactive Budget Calculator.</p>
          <p>We've logged your request for <strong>${service.replace(/_/g, ' ')}</strong> with the following requirements:</p>
          <ul>
            ${features?.length > 0 ? features.map((f: string) => `<li>${f.replace(/_/g, ' ')}</li>`).join("") : "<li>Base service package</li>"}
          </ul>
          <p>We're reviewing the scope against our schedule and capabilities. As an agency with <strong>fixed, predictable pricing</strong>, our next step is a brief strategy call to align on your exact goals so we can put together a hard-cost proposal mapped to the estimate you saw on-screen.</p>
          <p>We will come back to you within one working day with the next steps.</p>
          <br/>
          <p>Best regards,<br/><strong>The LevelOne Team</strong></p>
          <p><small>LevelOne Agency - Surrey, UK</small></p>
        `,
      });
  
    if (clientError) {
        // Log it, but don't fail the request if the agency email sent successfully
        console.error("Resend API error (Client Auto-responder):", clientError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
