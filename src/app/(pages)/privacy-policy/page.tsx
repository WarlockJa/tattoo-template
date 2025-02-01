import { brandChildrenPrivacyAge, brandEmail, brandName } from "@/appConfig";
import { Locale } from "@/i18n/config";
import { format } from "date-fns";
import { enUS, ru, tr } from "date-fns/locale";
import { getLocale, getTranslations } from "next-intl/server";

export default async function PrivacyPolicyPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("PrivacyPolicy");
  return (
    <div className="mt-28">
      <section className="mx-auto my-12 flex max-w-screen-md flex-col justify-between overflow-hidden px-2 leading-8">
        <p className="text-right font-serif">
          {t("effective_date", {
            date: format("20 december 2024", "do MMMM yyyy", {
              locale: locale === "ru" ? ru : locale === "tr" ? tr : enUS,
            }),
          })}
        </p>
        <p className="py-4 indent-8 text-xl">
          {t("preamble", { entity: brandName })}
        </p>
        <div>
          <h2 className="py-4 text-2xl font-bold">
            {t("information_we_collect.title")}
          </h2>
          <ul className="list-disc pl-8">
            <li>
              <span className="text-lg font-semibold">
                {t("information_we_collect.item1.title")}
                :&nbsp;&nbsp;&nbsp;
              </span>
              {t("information_we_collect.item1.text")}
            </li>
            <li>
              <span className="text-lg font-semibold">
                {t("information_we_collect.item2.title")}:&nbsp;&nbsp;&nbsp;
              </span>
              {t("information_we_collect.item2.text")}
            </li>
          </ul>
        </div>
        <div>
          <h2 className="py-4 text-2xl font-bold">
            {t("how_we_use_your_information.title")}
          </h2>
          <ul className="list-disc pl-8">
            <li>
              <span className="text-lg font-semibold">
                {t("how_we_use_your_information.item1.title")}
                :&nbsp;&nbsp;&nbsp;
              </span>
              {t("how_we_use_your_information.item1.text")}
            </li>
            <li>
              <span className="text-lg font-semibold">
                {t("how_we_use_your_information.item2.title")}
                :&nbsp;&nbsp;&nbsp;
              </span>
              {t("how_we_use_your_information.item2.text")}
            </li>
            <li>
              <span className="text-lg font-semibold">
                {t("how_we_use_your_information.item3.title")}
                :&nbsp;&nbsp;&nbsp;
              </span>
              {t("how_we_use_your_information.item3.text")}
            </li>
          </ul>
        </div>
        <div>
          <h2 className="py-4 text-2xl font-bold">{t("data_sharing.title")}</h2>
          <ul className="list-disc pl-8">
            <li>
              <span className="text-lg font-semibold">
                {t("data_sharing.item1.title")}:&nbsp;&nbsp;&nbsp;
              </span>
              {t("data_sharing.item1.text")}
            </li>
            <li>
              <span className="text-lg font-semibold">
                {t("data_sharing.item2.title")}:&nbsp;&nbsp;&nbsp;
              </span>
              {t("data_sharing.item2.text")}
            </li>
          </ul>
        </div>
        <div>
          <h2 className="py-4 text-2xl font-bold">
            {t("data_security.title")}
          </h2>
          <ul className="list-disc pl-8">
            <li>{t("data_security.text1")}</li>
          </ul>
        </div>
        <div>
          <h2 className="py-4 text-2xl font-bold">{t("your_rights.title")}</h2>
          <ul className="list-disc pl-8">
            <li>{t("your_rights.text1")}</li>
            <li>{t("your_rights.text2", { email: brandEmail })}</li>
          </ul>
        </div>
        <div>
          <h2 className="py-4 text-2xl font-bold">
            {t("cookies_and_tracking.title")}
          </h2>
          <ul className="list-disc pl-8">
            <li>{t("cookies_and_tracking.text1")}</li>
          </ul>
        </div>
        <div>
          <h2 className="py-4 text-2xl font-bold">
            {t("third_party_services.title")}
          </h2>
          <ul className="list-disc pl-8">
            <li>{t("third_party_services.text1")}</li>
          </ul>
        </div>
        <div>
          <h2 className="py-4 text-2xl font-bold">
            {t("childrens_privacy.title")}
          </h2>
          <ul className="list-disc pl-8">
            <li>
              {t("childrens_privacy.text1", { age: brandChildrenPrivacyAge })}
            </li>
          </ul>
        </div>
        <div>
          <h2 className="py-4 text-2xl font-bold">
            {t("changes_to_this_policy.title")}
          </h2>
          <ul className="list-disc pl-8">
            <li>{t("changes_to_this_policy.text1")}</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export const runtime = "edge";
