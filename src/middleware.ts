import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define routes that require auth
const protectedRoutes = ["/dashboard", "/profile", "/orders", "/wishlist"];

// Define routes for guests only (login/register)
const authRoutes = ["/login", "/register", "/reset-password"];

export function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get("auth_token")?.value;

  const path = request.nextUrl.pathname;

  if (!token && protectedRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the request is for a protected route and the token is missing, redirect to login page
  if (token && authRoutes.some((route) => path.startsWith(route))) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Otherwise, allow request
  return NextResponse.next();
}

// Configure which routes middleware runs on
export const config = {
  matcher: ["/:path*"],
};
