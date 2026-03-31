import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

// ─── Validation ───────────────────────────────────────────────────────────────

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// ─── NextAuth v5 config ───────────────────────────────────────────────────────

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const parsed = credentialsSchema.safeParse(credentials);
          if (!parsed.success) {
            console.error("[auth] Schema validation failed:", parsed.error);
            return null;
          }

          const { email, password } = parsed.data;

          let user;
          try {
            user = await prisma.user.findUnique({ where: { email } });
          } catch (err) {
            console.error("[auth] Database error:", err);
            return null;
          }

          if (!user) {
            console.error("[auth] User not found:", email);
            return null;
          }

          if (!user.password) {
            console.error("[auth] User has no password hash:", email);
            return null;
          }

          const valid = await bcrypt.compare(password, user.password);
          if (!valid) {
            console.error("[auth] Password mismatch for:", email);
            return null;
          }

          console.log("[auth] Login successful for:", email);

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (err) {
          console.error("[auth] Unexpected error in authorize:", err);
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.role = (user as any).role ?? "USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
});
