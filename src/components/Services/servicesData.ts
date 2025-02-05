export type ServicesType = "tattoo" | "body piercing" | "permanent makeup";

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
    name: "body piercing",
    href: "/services/body-piercing",
  },
  {
    name: "permanent makeup",
    href: "/services/permanent makeup",
  },
];
