import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export default function middleware(req) {
  const isAuthenticated = cookies().get("authToken");
  const publicRoutes = [
    "/login",
    "/fonts",
    "/images",
    "/scss",
    "/_next",
    "/favicon.ico",
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    req?.nextUrl?.pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!isAuthenticated?.value) {
   
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    absoluteUrl.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  return NextResponse.next();
}
