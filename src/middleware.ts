import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // First, update the session
  const response = await updateSession(request);

  // Get the pathname
  const pathname = request.nextUrl.pathname;

  // Define allowed paths that don't require tenant selection
  const allowedPaths = [
    "/", // Landing page
    "/register", // Tenant registration
    "/demo", // Demo root (will be handled by TenantGuard)
    "/api", // API routes
    "/_next", // Next.js internal routes
    "/favicon.ico",
  ];

  // Check if the current path is allowed without tenant
  const isAllowedPath = allowedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  // If it's a demo route but not an allowed path, check for tenant
  if (pathname.startsWith("/demo/") && !isAllowedPath) {
    // Extract university subdomain from path
    const pathParts = pathname.split("/");
    if (pathParts.length >= 3) {
      const subdomain = pathParts[2];

      // For now, we'll let the TenantGuard handle the validation
      // In a more sophisticated approach, you could check against a list of valid subdomains
      // or make an API call to validate the tenant exists

      // If it's a known invalid subdomain, redirect to landing
      if (subdomain === "undefined" || subdomain === "null") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
