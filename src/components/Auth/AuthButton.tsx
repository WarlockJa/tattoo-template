import getSession from "@/lib/db/getSession";
import SignOutComponent from "./SignOutComponent";
import SignInClientComponent from "./SignInClientComponent";

export default async function AuthButton({
  size = 40,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const session = await getSession();

  return session ? (
    <SignOutComponent size={size} className={className} />
  ) : (
    <SignInClientComponent size={size} className={className} />
  );
}
