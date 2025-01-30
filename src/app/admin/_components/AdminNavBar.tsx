"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminNavBar() {
  return (
    <nav className="flex w-full gap-4">
      <Button asChild>
        <Link href={"/admin/images"}>Images</Link>
      </Button>
    </nav>
  );
}
