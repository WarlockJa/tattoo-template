import { getTranslations } from "next-intl/server";

export default async function DisclaimerPage() {
  const t = await getTranslations("Disclaimer");
  return (
    <div className="mt-28 min-h-screen">
      <section className="mx-auto my-12 flex max-w-screen-md flex-col justify-between gap-4 overflow-hidden px-2 leading-8">
        <p className="text-justify indent-8">{t("text1")}</p>
        <p className="text-justify indent-8">{t("text2")}</p>
        <p className="text-justify indent-8">{t("text3")}</p>
        <p className="text-justify indent-8">{t("text4")}</p>
      </section>
    </div>
  );
}

export const runtime = "edge";
