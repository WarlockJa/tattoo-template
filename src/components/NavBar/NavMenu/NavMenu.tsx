import ClientNavBarMenuItem from "./ClientNavBarMenuItem";

export interface IItemNavBar {
  href: string;
  title: "home" | "contacts";
}
export const MENU_ITEMS: IItemNavBar[] = [
  {
    href: "/",
    title: "home",
  },
  {
    href: "/contact",
    title: "contacts",
  },
];

export default async function NavMenu() {
  return (
    <nav className="hidden md:block">
      <ul className="relative flex gap-8">
        {MENU_ITEMS.map((item) => (
          <ClientNavBarMenuItem key={item.href} {...item} />
        ))}
      </ul>
    </nav>
  );
}
