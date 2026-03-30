import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { revalidatePath, revalidateTag } from "next/cache";

interface WebhookPayload {
  _type: string;
  slug?: { current: string };
}

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true // wait for Sanity CDN propagation before revalidating
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid HMAC signature", { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse("Missing _type in webhook payload", {
        status: 400,
      });
    }

    // Revalidate by document type tag
    revalidateTag(body._type);

    // Revalidate specific paths based on content type
    switch (body._type) {
      case "post":
        revalidatePath("/insights");
        revalidatePath("/"); // homepage InsightsPreview
        if (body.slug?.current) {
          revalidatePath(`/insights/${body.slug.current}`);
        }
        break;

      case "category":
      case "author":
        revalidatePath("/insights");
        break;

      case "siteSettings":
        revalidatePath("/insights");
        revalidatePath("/");
        break;
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: body._type,
    });
  } catch (err) {
    console.error("[Sanity Webhook] Error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
