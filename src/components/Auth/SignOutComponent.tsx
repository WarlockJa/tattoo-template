import { signOut } from "@auth/auth";
import { revalidateTag } from "next/cache";
import { LogOut } from "lucide-react";

export default async function SignOutComponent({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        revalidateTag("signInState");
      }}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <button type="submit">
        <LogOut size={size} className={className} />
      </button>
    </form>
  );
}
