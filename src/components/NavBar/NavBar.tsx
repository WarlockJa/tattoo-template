import Link from "next/link";
import AuthButton from "../Auth/AuthButton";
import RegisteredUserData from "./RegisteredUserData";
import NavMenu from "./NavMenu/NavMenu";
import SheetMenu from "./SheetMenu/SheetMenu";
import LocaleSwitcher from "../Locale/LocaleSwitcher";
import { brandName } from "@/appConfig";

export default function NavBar() {
  return (
    <nav className="bg-background font-kings sticky top-0 z-30 flex h-[var(--navbar-height)] justify-between gap-6 px-4">
      <Link href={"/"}>
        <div className="flex h-[var(--navbar-height)] items-center">
          <img
            src="/logo.png"
            className="h-full object-cover py-1"
            alt="logo"
          />
          <h1 className="hidden text-3xl uppercase lg:block">{brandName}</h1>
        </div>
      </Link>

      <div className="flex flex-1 items-center justify-end">
        <NavMenu />
      </div>

      <div className="flex gap-6">
        <RegisteredUserData className="flex items-center gap-6 text-lg" />
        <SheetMenu>
          {/* <ThemeToggle className="cursor-pointer transition-opacity hover:opacity-80" /> */}
          <LocaleSwitcher />
          <AuthButton className="cursor-pointer transition-opacity hover:opacity-80" />
        </SheetMenu>
      </div>
    </nav>
  );
}
