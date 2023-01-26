import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, protectedRoutes } from "./router/routes";

export function middleware(request: NextRequest) {
  const currentUser: any = request.cookies.get("token")?.value; 
  if (
    protectedRoutes.includes(request.nextUrl.pathname) &&
    (!currentUser || Date.now() > currentUser.exp)
  ) {
    request.cookies.delete("token");
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("token");

    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }
}