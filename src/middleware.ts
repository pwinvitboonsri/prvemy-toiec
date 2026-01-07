import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/middleware";
import {
  PROTECTED_ROUTES,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
} from "../config/route";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const { supabase, response } = createClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtectedRoute = PROTECTED_ROUTES.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const isAuthRoute = AUTH_ROUTES.some((path) => pathname.startsWith(path));

  if (isAuthRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = DEFAULT_LOGIN_REDIRECT;
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
