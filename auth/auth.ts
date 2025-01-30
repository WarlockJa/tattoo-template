import NextAuth from "next-auth";
import google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  accounts,
  users,
  sessions,
  verificationTokens,
} from "@cf/db/schemaAuth";
import { env } from "@/lib/env.mjs";
import { db } from "@cf/db/db-connection";

// const protectedRoutes: string[] = ["/crud"];
export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: env.AUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "database",
  },
  // replacing schema with a custom fields schema in the adapter
  // @ts-ignore
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    // @ts-ignore
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    google({
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {},
  pages: {},
});
