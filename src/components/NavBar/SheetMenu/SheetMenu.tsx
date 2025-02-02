"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { ReactNode, useState } from "react";
import Link from "next/link";
import HamburgerButton from "./HamburgerButton";
import { useTranslations } from "next-intl";

export default function SheetMenu({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  const tSheetMenu = useTranslations("SheetMenu");
  return (
    <Sheet onOpenChange={setOpen}>
      <SheetTrigger className="cursor-pointer">
        <HamburgerButton open={open} />
      </SheetTrigger>
      <SheetContent
        side={"top"}
        className="mx-auto flex h-screen w-screen max-w-(--breakpoint-xsm) flex-col items-center justify-center border border-y-transparent shadow-none"
      >
        <menu className="font-kings w-full font-bold">
          <ul className="flex flex-col items-center gap-8">
            <li className="text-center text-2xl md:text-3xl">
              <Link className="transition-opacity hover:opacity-80" href={"/"}>
                <SheetMenuItem withSheetClose>
                  <div>{tSheetMenu("home")}</div>
                </SheetMenuItem>
              </Link>
            </li>
            <li className="from-background via-foreground to-background h-0.5 w-full bg-gradient-to-r"></li>
            <li className="text-center text-2xl md:text-3xl">
              <Link
                className="transition-opacity hover:opacity-80"
                href={"/#special"}
              >
                <SheetMenuItem withSheetClose>
                  <div>{tSheetMenu("specials")}</div>
                </SheetMenuItem>
              </Link>
            </li>
            <li className="from-background via-foreground to-background h-0.5 w-full bg-gradient-to-r"></li>
            <li className="text-center text-2xl md:text-3xl">
              <Link
                className="transition-opacity hover:opacity-80"
                href={"/#workhours"}
              >
                <SheetMenuItem withSheetClose>
                  <div>{tSheetMenu("workhours")}</div>
                </SheetMenuItem>
              </Link>
            </li>
            <li className="from-background via-foreground to-background h-0.5 w-full bg-gradient-to-r"></li>
            <li className="text-center text-2xl md:text-3xl">
              <Link
                className="transition-opacity hover:opacity-80"
                href={"/contact"}
              >
                <SheetMenuItem withSheetClose>
                  <div>{tSheetMenu("contacts")}</div>
                </SheetMenuItem>
              </Link>
            </li>
            <li className="from-background via-foreground to-background h-0.5 w-full bg-linear-to-r"></li>
          </ul>
        </menu>
        <div className="flex items-center justify-center gap-4">{children}</div>
      </SheetContent>
      <DialogTitle className="hidden" />
    </Sheet>
  );
}

// attaching SheetClose to menu items
const SheetMenuItem = ({
  withSheetClose,
  children,
}: {
  withSheetClose?: boolean;
  children: ReactNode;
}) => {
  const [SheetCloseWrapper, sheetCloseWrapperProps] = withSheetClose
    ? [SheetClose, { asChild: true }]
    : [React.Fragment, undefined];
  return (
    <div>
      <SheetCloseWrapper {...sheetCloseWrapperProps}>
        {children}
      </SheetCloseWrapper>
    </div>
  );
};
