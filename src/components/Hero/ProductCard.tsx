import { ReactNode } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function ProductCard({
  children,
  description,
  price,
  title,
}: {
  title: string;
  description: string;
  price: number;
  children: ReactNode;
}) {
  return (
    <Popover>
      <PopoverTrigger className="shadow transition-shadow hover:shadow-md">
        <div className="cursor-pointer overflow-clip rounded-t-2xl border text-left">
          <div className="relative h-64">
            {children}
            <div className="bg-background/80 absolute right-0 bottom-0 px-2 py-0.5 text-xl font-semibold">
              {price}₺
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl">{title}</h2>
            <p className="text-muted-foreground line-clamp-2 text-ellipsis">
              {description}
            </p>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent>{description}</PopoverContent>
    </Popover>
  );
}
