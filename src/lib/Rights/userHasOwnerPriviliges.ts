import { RoleTypes } from "next-auth";

export default function userHasOwnerPriviliges({
  role,
}: {
  role: string | null | undefined;
}) {
  if (!role) return false;

  switch (role as RoleTypes) {
    case "admin":
    case "owner":
      return true;

    default:
      return false;
  }
}
