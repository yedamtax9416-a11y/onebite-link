import { NextRequest, NextResponse } from "next/server";

function decodeHtmlEntities(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractMetaContent(html: string, ...names: string[]) {
  for (const name of names) {
    const patterns = [
      new RegExp(
        `<meta[^>]+property=["']${name}["'][^>]+content=["']([^"']*)["']`,
        "i"
      ),
      new RegExp(
        `<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${name}["']`,
        "i"
      ),
      new RegExp(
        `<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["']`,
        "i"
      ),
      new RegExp(
        `<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["']`,
        "i"
      ),
    ];
    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match) return decodeHtmlEntities(match[1]);
    }
  }
  return undefined;
}

function extractTitleTag(html: string) {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? decodeHtmlEntities(match[1].trim()) : undefined;
}

function resolveUrl(base: string, maybeRelative: string) {
  try {
    return new URL(maybeRelative, base).toString();
  } catch {
    return undefined;
  }
}

export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get("url");

  if (!targetUrl) {
    return NextResponse.json(
      { error: "url 파라미터가 필요합니다." },
      { status: 400 }
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(targetUrl);
  } catch {
    return NextResponse.json(
      { error: "올바른 URL 형식이 아닙니다." },
      { status: 400 }
    );
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return NextResponse.json(
      { error: "http 또는 https URL만 지원합니다." },
      { status: 400 }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(parsedUrl.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; OnebiteLinkBot/1.0; +https://onebite-link.local)",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "링크 정보를 가져오지 못했습니다." },
        { status: 502 }
      );
    }

    const html = await response.text();

    const title =
      extractMetaContent(html, "og:title", "twitter:title") ??
      extractTitleTag(html) ??
      parsedUrl.hostname;
    const description =
      extractMetaContent(
        html,
        "og:description",
        "twitter:description",
        "description"
      ) ?? "";
    const rawImage = extractMetaContent(html, "og:image", "twitter:image");
    const image = rawImage ? resolveUrl(parsedUrl.toString(), rawImage) ?? "" : "";

    return NextResponse.json({
      title,
      description,
      image,
      url: parsedUrl.toString(),
    });
  } catch {
    return NextResponse.json(
      { error: "링크 정보를 가져오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  } finally {
    clearTimeout(timeout);
  }
}
