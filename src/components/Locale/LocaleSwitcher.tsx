import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";
import { Locale, locales } from "@/i18n/config";

export default function LocaleSwitcher({ menu }: { menu?: boolean }) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={locales.map((lng) => ({ value: lng, label: t(lng) }))}
      label={t("label")}
      lng={menu ? t(locale as Locale) : undefined}
    />
  );
}
