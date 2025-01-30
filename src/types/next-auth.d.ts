import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }

  type RoleTypes = "admin" | "owner" | "editor";

  interface User {
    role: RoleTypes | null;
  }
}
