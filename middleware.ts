import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PREFIXES = ["/checkout", "/dashboard", "/account"];
const ADMIN_PREFIX = "/admin";
const AUTH_PAGES = ["/auth/login", "/auth/register"];

export default auth((req: NextRequest & { auth: Awaited<ReturnType<typeof auth>> }) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session?.user;
  const isAdmin = session?.user?.role === "ADMIN";

  // Redirect authenticated users away from auth pages
  if (isLoggedIn && AUTH_PAGES.some((p) => nextUrl.pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Protect admin routes
  if (nextUrl.pathname.startsWith(ADMIN_PREFIX)) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Protect user routes
  if (PROTECTED_PREFIXES.some((p) => nextUrl.pathname.startsWith(p))) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static, _next/image (Next.js internals)
     * - favicon.ico, public assets
     * - api/auth (NextAuth handlers must not be intercepted)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
