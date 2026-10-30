import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, isValidLocale, SUPPORTED_LOCALES } from "@/lib/i18n/dictionaries";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass admin, API routes, Next.js internals, and static files
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if pathname already starts with a supported locale (/en or /fr)
  const segments = pathname.split("/");
  const firstSegment = segments[1];

  if (isValidLocale(firstSegment)) {
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", firstSegment, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  // Determine preferred locale from cookie or Accept-Language header
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  let targetLocale = DEFAULT_LOCALE;

  if (cookieLocale && isValidLocale(cookieLocale)) {
    targetLocale = cookieLocale;
  } else {
    const acceptLang = request.headers.get("accept-language") || "";
    const prefersFrench = acceptLang
      .split(",")
      .map((part) => part.trim().split(";")[0].toLowerCase())
      .some((lang) => lang === "fr" || lang.startsWith("fr-"));
    if (prefersFrench && SUPPORTED_LOCALES.includes("fr")) {
      targetLocale = "fr";
    }
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = pathname === "/" ? `/${targetLocale}` : `/${targetLocale}${pathname}`;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!api|admin|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};

