import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get("auth_token")?.value;


  console.log('middleware')

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/account"];

  console.log(request.nextUrl.pathname);

  // Check if current path is protected
  const isProtected = protectedRoutes.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // If route is protected and no token → redirect to login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user tries to access login page but already has token → redirect
  if (request.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Otherwise, allow request
  return NextResponse.next();
}

// Configure which routes middleware runs on
export const config = {
  matcher: ["/:path*"],
};
