"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import Link from "next/link";
import { IItemNavBar } from "./NavMenu";
import { cn } from "@/lib/utils";

const getRootPath = (pathname: string) => {
  const isNestedPath = pathname.slice(1).indexOf("/");

  const rootPath =
    isNestedPath === -1
      ? pathname
      : pathname.slice(0, pathname.slice(1).indexOf("/") + 1);

  return rootPath;
};

export default function ClientNavBarMenuItem({
  href,
  title,
  dropdown,
}: IItemNavBar & { dropdown?: boolean }) {
  const pathname = usePathname();
  const t = useTranslations("NavMenu");
  const rootPath = useMemo(() => getRootPath(pathname), [pathname]);

  return (
    <>
      {dropdown ? (
        t(title).toLocaleUpperCase()
      ) : (
        <Link
          className="hover:text-accent text-xl text-nowrap transition-all hover:drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]"
          href={href}
        >
          {t(title).toLocaleUpperCase()}
        </Link>
      )}
      {rootPath === href && (
        <motion.div
          className={cn(
            "bg-accent absolute right-0 bottom-0 left-0 h-0.5",
            dropdown && "right-8 left-4",
          )}
          layoutId="underline"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      )}
    </>
  );
}
