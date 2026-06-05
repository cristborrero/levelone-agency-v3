import { NextResponse } from "next/server";
import { Resend } from "resend";
import { quoteSchema } from "@/components/quote/schema";

const fmt = (num: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(num);

const humanise = (str: string) =>
  str.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

  try {
    const data = await request.json();
    
    // Validate request body against shared schema
    const parseResult = quoteSchema.safeParse(data);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const {
      service,
      hasWebsite,
      brandingStatus,
      startTimeline,
      budgetBracket,
      fastTrack,
      name,
      email,
      company,
      additionalDetails,
      wantsCall,
      phone,
      calculatedEstimate,
      
      // Service specific
      siteType,
      webAddons,
      pageCount,
      copywriting,
      seoInterest,
      ecommercePlatform,
      ecommerceFeatures,
      productScale,
      brandPackage,
      brandDeliverables,
      marketingChannels,
      adSpendBudget,
      contentNeeded,
      aiCapabilities,
      aiIntegrations,
      fullPackagePriority,
    } = parseResult.data; // Use validated data!

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = company ? escapeHtml(company) : "";
    const safePhone = phone ? escapeHtml(phone) : "";
    const safeAdditionalDetails = additionalDetails ? escapeHtml(additionalDetails) : "";

    const isRetainer = calculatedEstimate?.type === "retainer";
    const estimateLabel = isRetainer ? "Estimated Monthly Retainer" : "Estimated Investment";
    const estimateValue = (calculatedEstimate && calculatedEstimate.min > 0)
      ? `${fmt(calculatedEstimate.min)} – ${fmt(calculatedEstimate.max)}${isRetainer ? " /mo" : ""}`
      : "Not calculated";

    // ── Build details list dynamically based on service ──
    const detailsList: { label: string; value: string }[] = [
      { label: "Primary Service", value: humanise(service) }
    ];

    if (hasWebsite) detailsList.push({ label: "Has Website?", value: humanise(hasWebsite) });
    if (brandingStatus) detailsList.push({ label: "Branding Status", value: humanise(brandingStatus) });
    if (startTimeline) detailsList.push({ label: "Start Timeline", value: humanise(startTimeline) });

    if (service === "web_design") {
      if (siteType) detailsList.push({ label: "Website Type", value: humanise(siteType) });
      if (webAddons && webAddons.length > 0) detailsList.push({ label: "Add-ons", value: webAddons.map(humanise).join(", ") });
      if (pageCount) detailsList.push({ label: "Page Count", value: humanise(pageCount) });
      if (copywriting) detailsList.push({ label: "Copywriting", value: humanise(copywriting) });
      if (seoInterest) detailsList.push({ label: "SEO Interest", value: humanise(seoInterest) });
    } else if (service === "e_commerce") {
      if (ecommercePlatform) detailsList.push({ label: "Store Platform", value: humanise(ecommercePlatform) });
      if (ecommerceFeatures && ecommerceFeatures.length > 0) detailsList.push({ label: "Features", value: ecommerceFeatures.map(humanise).join(", ") });
      if (productScale) detailsList.push({ label: "Product Scale", value: humanise(productScale) });
    } else if (service === "brand_identity") {
      if (brandPackage) detailsList.push({ label: "Brand Package", value: humanise(brandPackage) });
      if (brandDeliverables && brandDeliverables.length > 0) detailsList.push({ label: "Deliverables", value: brandDeliverables.map(humanise).join(", ") });
    } else if (service === "digital_marketing") {
      if (marketingChannels && marketingChannels.length > 0) detailsList.push({ label: "Marketing Channels", value: marketingChannels.map(humanise).join(", ") });
      if (adSpendBudget) detailsList.push({ label: "Ad Spend Budget", value: humanise(adSpendBudget) });
      if (contentNeeded) detailsList.push({ label: "Content Needed", value: humanise(contentNeeded) });
    } else if (service === "ai_solutions") {
      if (aiCapabilities && aiCapabilities.length > 0) detailsList.push({ label: "AI Capabilities", value: aiCapabilities.map(humanise).join(", ") });
      if (aiIntegrations && aiIntegrations.length > 0) detailsList.push({ label: "AI Integrations", value: aiIntegrations.map(humanise).join(", ") });
    } else if (service === "full_package") {
      if (fullPackagePriority) detailsList.push({ label: "Activation Priority", value: humanise(fullPackagePriority) });
    }

    if (budgetBracket) detailsList.push({ label: "Budget Bracket", value: humanise(budgetBracket) });
    detailsList.push({ label: "Fast Track?", value: fastTrack === "yes" ? "Yes (+25%)" : "No" });

    const tableRows = detailsList
      .map(
        (item) =>
          `<tr><td style="padding: 6px 0; color: #666; width: 180px;">${item.label}</td><td style="padding: 6px 0; font-weight: bold;">${item.value}</td></tr>`
      )
      .join("");

    // ── 1. Agency notification email ──
    const agencyHtml = `
      <div style="font-family: sans-serif; max-width: 640px; color: #111;">
        <h2 style="border-bottom: 2px solid #d4ff00; padding-bottom: 8px;">
          📋 New Quote Request — ${safeName}
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="padding: 6px 0; color: #666; width: 180px;">Name</td><td style="padding: 6px 0; font-weight: bold;">${safeName}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Company</td><td style="padding: 6px 0;">${safeCompany || "—"}</td></tr>
          <tr><td style="padding: 6px 0; color: #666;">Wants a call?</td><td style="padding: 6px 0;">${wantsCall === "yes" ? `Yes — ${safePhone || "no number provided"}` : "No"}</td></tr>
        </table>

        <h3 style="color: #555; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Project Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          ${tableRows}
        </table>

        <div style="background: #f9f9f9; border-left: 4px solid #d4ff00; padding: 16px 20px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #888;">${estimateLabel}</p>
          <p style="margin: 4px 0 0; font-size: 28px; font-weight: bold; color: #111;">${estimateValue}</p>
        </div>

        ${safeAdditionalDetails ? `
        <h3 style="color: #555; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Additional Context</h3>
        <p style="background: #f5f5f5; padding: 12px 16px; border-radius: 4px; line-height: 1.6;">${safeAdditionalDetails.replace(/\n/g, "<br>")}</p>
        ` : ""}

        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
        <p style="font-size: 11px; color: #aaa;">Sent from the LevelOne Agency Quote Calculator</p>
      </div>
    `;

    const { error: agencyError } = await resend.emails.send({
      from: "LevelOne Agency <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "hello@leveloneagency.co.uk",
      subject: `[QUOTE] ${safeName} — ${humanise(service)}${safeCompany ? ` (${safeCompany})` : ""}`,
      html: agencyHtml,
      replyTo: safeEmail,
    });

    if (agencyError) {
      console.error("Resend API error (Agency):", agencyError);
      return NextResponse.json({ error: agencyError }, { status: 400 });
    }

    // ── 2. Client auto-responder ──
    const firstName = safeName.split(" ")[0];
    
    let selectedAddons: string[] = [];
    if (service === "web_design") selectedAddons = webAddons || [];
    else if (service === "e_commerce") selectedAddons = ecommerceFeatures || [];
    else if (service === "brand_identity") selectedAddons = brandDeliverables || [];
    else if (service === "digital_marketing") selectedAddons = marketingChannels || [];
    else if (service === "ai_solutions") selectedAddons = [...(aiCapabilities || []), ...(aiIntegrations || [])];

    const addonList = selectedAddons.length > 0
      ? selectedAddons.map((a: string) => `<li>${humanise(a)}</li>`).join("")
      : "<li>Base service package</li>";

    const clientHtml = `
      <div style="font-family: sans-serif; max-width: 600px; color: #111;">
        <p>Hi ${firstName},</p>
        <p>Thanks for reaching out — we've received your project details via our Quote Calculator.</p>
        <p>Here's what we've logged for your <strong>${humanise(service)}</strong> project:</p>
        <ul style="line-height: 2;">${addonList}</ul>
        ${startTimeline ? `<p>You're looking to start: <strong>${humanise(startTimeline)}</strong>.</p>` : ""}
        <p>Our team reviews every submission personally — no automated proposals here. We'll come back to you within <strong>one working day</strong> with a tailored brief and next steps.</p>
        ${wantsCall === "yes" ? "<p>You've requested a call — we'll reach out to the number you provided to schedule a convenient time.</p>" : ""}
        <br/>
        <p>Best regards,<br/><strong>The LevelOne Team</strong></p>
        <p><small>LevelOne Agency — Surrey, UK — <a href="https://leveloneagency.co.uk">leveloneagency.co.uk</a></small></p>
      </div>
    `;

    const { error: clientError } = await resend.emails.send({
      from: "LevelOne Agency <onboarding@resend.dev>",
      to: safeEmail,
      subject: "Your Project Enquiry — LevelOne Agency",
      html: clientHtml,
    });

    if (clientError) {
      console.error("Resend API error (Client):", clientError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
