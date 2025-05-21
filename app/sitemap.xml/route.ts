import { NextResponse } from "next/server";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  console.log(siteUrl)

  const staticPaths = ["", "contact", "play", "leaderboard", "profile"];

  const allPaths = [...staticPaths];

  const lastmod = new Date().toISOString().split("T")[0];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths
  .map(
    (path) => `
  <url>
    <loc>${siteUrl}/${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${path === "" ? "1.0" : "0.7"}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
