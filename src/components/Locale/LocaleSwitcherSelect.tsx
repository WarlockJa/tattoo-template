"use client";

import { useState, useTransition } from "react";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import en from "@/../messages/en.json";
import { useTranslations } from "next-intl";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
  lng?: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
  lng,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const [currentLocale, setCurrentLocale] = useState<Locale>(
    defaultValue as Locale,
  );
  const t = useTranslations("LocaleSwitcher");

  function onChange(value: string) {
    const locale = value as Locale;
    setCurrentLocale(locale);
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative">
      <Select defaultValue={defaultValue} onValueChange={onChange}>
        <SelectTrigger
          aria-label={label}
          hideArrow
          className={cn(
            "justify-center rounded-sm border-transparent p-0 shadow-none",
            "cursor-pointer text-5xl transition-opacity hover:opacity-80",
            isPending && "pointer-events-none opacity-60",
          )}
        >
          {lng ? (
            <div className="flex w-full p-2 text-sm">
              <div className="text-[1rem]">{lng}</div>
              <div className="ml-auto">{t("label")}</div>
            </div>
          ) : (
            en.LocaleSwitcher[currentLocale].slice(0, 4)
          )}
        </SelectTrigger>
        <SelectContent
          align="end"
          className="overflow-hidden rounded-sm p-1 shadow-md"
          position="popper"
        >
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
