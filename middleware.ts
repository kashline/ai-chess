export { auth as middleware } from "@/auth";
export const config = {
  matcher: [
    "/recipes/:path/edit",
    "/create",
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
