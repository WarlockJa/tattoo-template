import { Button } from "@/components/ui/button";
import HeaderImage from "@/components/UniversalComponents/HeaderImage";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const runtime = "edge";

export default async function NotFound() {
  const t404 = await getTranslations("NotFound");
  const title = `404: ${t404("title")}`;
  return (
    <HeaderImage
      dbImageName="v88jgq74sjii9qzqle5511wx-404.webp"
      containerClassName="h-screen w-screen"
      className="flex flex-col"
      imgCover
    >
      <title>{title}</title>
      <h1 className="text-xl">{t404("title").toLocaleUpperCase()}</h1>
      <p className="text-accent pointer-events-none text-9xl drop-shadow-[8px_8px_4px_rgba(0,0,0,0.8)] md:text-[20rem]">
        404
      </p>
      <Link href={"/"}>
        <Button className="border-accent bg-background/60 hover:bg-background/80 text-foreground cursor-pointer border-2 p-6">
          {t404("go_back")}
        </Button>
      </Link>
    </HeaderImage>
  );
}
