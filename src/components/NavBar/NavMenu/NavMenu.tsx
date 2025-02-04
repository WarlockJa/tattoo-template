import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ClientNavBarMenuItem from "./ClientNavBarMenuItem";
import React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { getCachedArtists } from "@/lib/cache/artists/getCachedArtists";

export interface IItemNavBar {
  href: string;
  title: "home" | "services" | "artists" | "contacts" | "faq";
}
export const MENU_ITEMS: IItemNavBar[] = [
  {
    href: "/",
    title: "home",
  },
  {
    href: "/services",
    title: "services",
  },
  {
    href: "/artists",
    title: "artists",
  },
  {
    href: "/contact",
    title: "contacts",
  },
  {
    href: "/faq",
    title: "faq",
  },
];

const servicesData: { title: string; href: string }[] = [
  {
    href: "/services/tattoo",
    title: "tattoo",
  },
  {
    href: "/services/body-piercing",
    title: "body piercing",
  },
  {
    href: "/services/permanent-makeup",
    title: "permanent makeup",
  },
];

// export default async function NavMenu() {
//   return (
//     <nav className="hidden md:block">
//       <ul className="relative flex gap-8">
//         {MENU_ITEMS.map((item) => (
//           <ClientNavBarMenuItem key={item.href} {...item} />
//         ))}
//       </ul>
//     </nav>
//   );
// }

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "focus:bg-primary-40 hover:bg-primary/40 hover:text-foreground focus:text-foreground block rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
            className,
            "group bg-primary/20 flex h-full min-h-16 items-center border",
          )}
          {...props}
        >
          <ChevronRight className="group-hover:text-accent -translate-x-2 transition-transform group-hover:translate-x-0" />
          <div>
            <div className="font-medium">{title}</div>
            <p className="text-muted-foreground line-clamp-2 align-middle text-sm leading-snug">
              {children}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default async function NavMenu() {
  const artists = await getCachedArtists();
  return (
    <NavigationMenu className="hidden xl:block">
      <NavigationMenuList className="gap-4">
        <NavigationMenuItem className="relative">
          <ClientNavBarMenuItem {...MENU_ITEMS[0]} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="relative bg-transparent text-xl transition-all hover:drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">
            <ClientNavBarMenuItem {...MENU_ITEMS[1]} dropdown />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              {servicesData.map((item) => (
                <ListItem
                  key={item.title}
                  // TODO translate
                  title={item.title.toLocaleUpperCase()}
                  href={item.href}
                  className="relative"
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger className="relative bg-transparent text-xl transition-all hover:drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]">
            <ClientNavBarMenuItem {...MENU_ITEMS[2]} dropdown />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              {artists.map((artist) => (
                <ListItem
                  key={artist.artistId}
                  // TODO translate
                  title={artist.name.toLocaleUpperCase()}
                  href={`/artists/${artist.slug}`}
                  className="relative"
                />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="relative">
          <ClientNavBarMenuItem {...MENU_ITEMS[3]} />
        </NavigationMenuItem>
        <NavigationMenuItem className="relative">
          <ClientNavBarMenuItem {...MENU_ITEMS[4]} />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
