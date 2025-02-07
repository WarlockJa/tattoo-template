import { Button } from "@/components/ui/button";
import CustomServerImage from "@/components/UniversalComponents/CustomServerImage";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function HomeServiceCard({
  name,
  dbImageName,
  className,
  href,
}: {
  name: string;
  dbImageName: string;
  className?: string;
  href?: string;
}) {
  const tServices = await getTranslations("Services");
  return (
    <div
      className={cn(
        "shadow-foreground group relative m-1 overflow-hidden rounded-2xl border-none shadow transition-shadow hover:shadow-md",
        className,
      )}
    >
      <CustomServerImage dbImageName={dbImageName} className="mt-0 mb-0" />
      <div className="bg-background/80 absolute inset-x-0 top-0 flex flex-col p-2">
        <div className="font-kings text-2xl">{name}</div>
      </div>
      {href && (
        <Link href={href}>
          <Button
            variant={"outline"}
            className="font-kings absolute right-0 bottom-0 cursor-pointer rounded-br-2xl px-8 py-5 text-2xl"
          >
            {tServices("learn_more")}
          </Button>
        </Link>
      )}
    </div>
  );
}
