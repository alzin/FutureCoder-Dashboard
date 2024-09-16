import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export default function middleware(req) {

  const isAuthenticated = cookies().get("authToken")?.value;

  if (!isAuthenticated) {
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    absoluteUrl.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!login|api|_next/static|_next/image|favicon.ico|fonts|images|scss|sitemap.xml|robots.txt).*)',
  ],
};




  
  // const publicRoutes = [
  //   "/login",
  //   "/fonts",
  //   "/images",
  //   "/scss",
  //   "/_next",
  //   "/favicon.ico",
  // ];

  // const protectedRoutes = ["/blogs", "/change-password", "/courses", "/courses-times", "/guest-users", "/reservations", "/subscribers"];
  // const publicRoutes = ["/login"]

  // const isPublicRoute = publicRoutes.some((route) =>
  //   req?.nextUrl?.pathname.startsWith(route)
  // );

  // if (isPublicRoute) {
  //   return NextResponse.next();
  // }