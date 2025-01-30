"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";
import { IItemNavBar } from "./NavMenu";
import { useTranslations } from "next-intl";

// const getRootPath = (pathname: string) => {
//   const isNestedPath = pathname.slice(1).indexOf("/");

//   const rootPath =
//     isNestedPath === -1
//       ? pathname
//       : pathname.slice(0, pathname.slice(1).indexOf("/") + 1);

//   return rootPath;
// };

export default function ClientNavBarMenuItem({ href, title }: IItemNavBar) {
  const pathname = usePathname();
  // const rootPath = useMemo(() => getRootPath(pathname), [pathname]);
  const tNavMenu = useTranslations("NavMenu");

  return (
    <div className="relative">
      <Link className="text-xl hover:underline" href={href}>
        {tNavMenu(title).toLocaleUpperCase()}
      </Link>
      {pathname === href && (
        <motion.div
          className={"bg-accent absolute right-0 bottom-0 left-0 h-0.5"}
          layoutId="underline"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      )}
    </div>
  );
}
