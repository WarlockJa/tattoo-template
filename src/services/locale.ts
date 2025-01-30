"use server";

import { cookies, headers } from "next/headers";
import { Locale, defaultLocale, locales } from "@/i18n/config";
import languageParser from "accept-language-parser";

// In this function the locale is first read from a cookie.
// if no cookie set, or found locale does not exist in locales
// reading accept-language header to identify preferred locale
// if accept-language data undefined falling back to defaultLangauge
const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  const cookiesData = await cookies();
  const headersData = await headers();
  const lngCookie = cookiesData.get(COOKIE_NAME)?.value;
  const acceptLanguage = headersData.get("accept-language");

  // @ts-expect-error includes does not like narrowing parameter string to literal values
  return lngCookie && locales.includes(lngCookie)
    ? lngCookie
    : (languageParser.pick(
        // @ts-expect-error pick does not like narrowing parameter string to literal values
        locales,
        acceptLanguage,
      ) ?? defaultLocale);
}

export async function setUserLocale(locale: Locale) {
  const cookiesData = await cookies();
  cookiesData.set(COOKIE_NAME, locale);
}
