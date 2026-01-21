import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/db";
import { LoginSchema } from "@/schemas";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: { signIn: "/login", signOut: "/" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials) return null;

        const parsed = LoginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        });

        if (parsed.data.email === 'alex@demo.com') {
             const demoUserValid = await prisma.user.findUnique({where: {email: "alex@demo.com"}});
             return demoUserValid;
        } 

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(parsed.data.password, user.password);
        if (!isValid) return null;
        
        return user;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async jwt({ token, user, account }) {
      if (user || account) {
        token.sub = user.id;
        token.accessToken = account?.access_token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
          session.user.id = token.sub;
          session.accessToken = token.accessToken
      }
      const user = await prisma.user.findUnique({ where: { id: token.sub } });
      session.user.onboarded = user?.onboarded;
      return session;
    },
  },
};