import { NextResponse } from "next/server";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new NextResponse(robotsTxt.trim(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
