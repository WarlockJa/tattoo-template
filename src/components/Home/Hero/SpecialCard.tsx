"use client";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import WhatsappButton from "@/components/WhatsappButton";

export function SpecialCard({
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
  const tWhatsAppButton = useTranslations("WhatsAppButton");
  return (
    <div className="grid overflow-clip rounded-2xl border md:grid-cols-2">
      <div className="relative h-96">
        {children}
        <div className="bg-background/80 absolute right-0 bottom-0 px-2 py-0.5 text-xl font-semibold">
          {price}₺
        </div>
      </div>
      <div className="relative space-y-4 p-4">
        <h2 className="text-2xl">{title}</h2>
        <div className="overflow-y-scroll md:h-60">
          <p className="text-muted-foreground">{description}</p>
        </div>

        <WhatsappButton
          className="float-end"
          textWA={`Merhaba! ${title} siparişi vermek istiyorum.`}
          text={tWhatsAppButton("order_now")}
        />
      </div>
    </div>
  );
}
