import { cn } from "@/lib/utils";

export default function HamburgerButton({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "bg-foreground h-1 w-10 origin-top-left transition-transform",
          open && "translate-x-1 rotate-45",
        )}
      ></div>
      <div
        className={cn(
          "bg-foreground h-1 w-10 transition-opacity",
          open && "opacity-0",
        )}
      ></div>
      <div
        className={cn(
          "bg-foreground h-1 w-10 origin-bottom-left transition-transform",
          open && "translate-x-1 translate-y-[3px] -rotate-45",
        )}
      ></div>
    </div>
  );
}
