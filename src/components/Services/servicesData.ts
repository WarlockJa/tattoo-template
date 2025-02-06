export type ServicesType = "tattoo" | "body_piercing" | "permanent_makeup";

interface ServiceItem {
  name: ServicesType;
  href: string;
}

export const servicesData: ServiceItem[] = [
  {
    name: "tattoo",
    href: "/services/tattoo",
  },
  {
    name: "body_piercing",
    href: "/services/body-piercing",
  },
  {
    name: "permanent_makeup",
    href: "/services/permanent-makeup",
  },
];
