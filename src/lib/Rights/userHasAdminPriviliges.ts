import { RoleTypes } from "next-auth";

export default function userHasAdminPriviliges({
  role,
}: {
  role: string | null | undefined;
}) {
  if (!role) return false;

  switch (role as RoleTypes) {
    case "admin":
      return true;

    default:
      return false;
  }
}
