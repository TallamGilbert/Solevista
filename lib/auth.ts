import { redirect } from "next/navigation";
import { auth } from "@/auth";

/**
 * Returns the current server-side session, or null if unauthenticated.
 * Drop-in replacement for NextAuth v4's getServerSession.
 */
export async function getServerSession() {
  return auth();
}

/**
 * Returns the session or redirects to /auth/login if unauthenticated.
 * Use in Server Components and Route Handlers that require a logged-in user.
 */
export async function requireAuth() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");
  return session;
}

/**
 * Returns the session or redirects to / if user is not ADMIN.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");
  if (session.user.role !== "ADMIN") redirect("/");
  return session;
}
