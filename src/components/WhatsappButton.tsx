import { cn } from "@/lib/utils";
import Link from "next/link";
import { brandWhatsApp } from "@/appConfig";
import WhatsAppIcon from "./Icons/WhatsAppIcon";

export default function WhatsappButton({
  textWA,
  className,
  text,
  iconClassName,
}: {
  textWA?: string;
  text?: string;
  className?: string;
  iconClassName?: string;
}) {
  const textURLEncoded = textWA ? encodeURIComponent(textWA) : "";
  return (
    <Link
      href={`https://wa.me/${brandWhatsApp.number.slice(1)}?text=${textURLEncoded}`}
      target="_blank"
      className={cn(
        "font-nunito text-foreground group rounded-none",
        className,
      )}
    >
      <div className="flex items-center gap-4 text-3xl underline group-hover:animate-pulse">
        {text}
        <WhatsAppIcon
          className={cn("h-10 w-10 fill-green-500", iconClassName)}
        />
      </div>
    </Link>
  );
}
