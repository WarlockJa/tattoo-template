import React, { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function NavMenuCard({
  href,
  title,
  children,
}: {
  title: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <Card className="group outline-accent bg-black/70 p-4 px-8 text-lg text-white hover:outline">
      <Link href={href} className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {children}
          <span className="font-kings text-xl">{title}</span>
        </div>
        <ChevronRight className="transition-transform group-hover:translate-x-1.5" />
      </Link>
    </Card>
  );
}
