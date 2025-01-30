import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function WorkHoursCard() {
  const tWorkhours = await getTranslations("WorkhoursCard");
  return (
    <Card className="bg-background/80 w-screen max-w-screen-sm">
      <CardHeader>
        <CardTitle className="text-5xl font-thin sm:text-6xl">
          {tWorkhours("open_hours")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-xl">
        <p>
          {tWorkhours("open_every_day", {
            time_from: "06:00",
            time_to: "21:00",
          })}
        </p>
        <p>{tWorkhours("fresh_bake_hours", { time_bread: "18:00" })}</p>
        <div className="flex w-full justify-end">
          <Link
            href={"/contact"}
            className="group flex items-center gap-1.5 text-lg underline"
          >
            <p>{tWorkhours("where_to_find_us")}</p>
            <ChevronRight className="transition-transform group-hover:translate-x-2" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
