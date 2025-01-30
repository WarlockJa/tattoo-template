import getSession from "@/lib/db/getSession";
import Link from "next/link";
import { Settings } from "lucide-react";
import userHasOwnerPriviliges from "@/lib/Rights/userHasOwnerPriviliges";

export default async function RegisteredUserData({
  className,
}: {
  className?: string;
}) {
  // getting user data
  const session = await getSession();
  const user = session?.user;

  if (!user || !userHasOwnerPriviliges({ role: user.role })) return null;

  return (
    <div className={className}>
      <Link
        href={"/config"}
        className="flex items-center transition-opacity hover:opacity-80"
      >
        <Settings size={32} />
      </Link>
    </div>
  );
}
