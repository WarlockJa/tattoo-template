import getSession from "@/lib/db/getSession";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Administrator tools",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // getting user data
  const session = await getSession();
  const user = session?.user;

  // redirecting unauthorised access
  if (user?.role !== "admin") {
    redirect("/");
  }

  return (
    <main className="mt-28 flex min-h-screen flex-col items-center bg-slate-600">
      <div className="mx-auto w-full max-w-(--breakpoint-lg)">{children}</div>
    </main>
  );
}
