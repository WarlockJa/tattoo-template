import NextLink from "next/link";
import TwitterIcon from "@/components/Icons/TwitterIcon";
import FacebookIcon from "@/components/Icons/FacebookIcon";
import YoutubeIcon from "@/components/Icons/YoutubeIcon";
import { brandFB, brandIG, brandName, brandX, brandYT } from "@/appConfig";
import { useTranslations } from "next-intl";
import Link from "next/link";
import InstagramIcon from "@/components/Icons/InstagramIcon";

export default function Footer() {
  const tFooter = useTranslations("Footer");
  return (
    <footer className="flex flex-col items-center text-lg">
      {/* Footer body */}
      <div className="xsm:justify-center flex w-full max-w-screen-lg flex-wrap items-start gap-4 pt-4 lg:gap-16">
        <div className="xsm:pl-2 flex flex-col items-center gap-2 p-2 pl-12">
          <h3 className="text-xl uppercase">{brandName}</h3>
          <div className="w-screen max-w-20">
            <img
              src="/logo.png"
              alt={`${brandName} logo`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="xsm:pl-2 flex flex-col gap-4 p-2 pl-12">
          <h1 className="from-foreground to-accent bg-gradient-to-b bg-clip-text text-xl text-transparent">
            {tFooter("quick_links")}
          </h1>
          <div className="flex w-fit flex-col gap-4 text-sm">
            <Link
              className="hover:text-accent transition-colors hover:underline"
              href={"/"}
            >
              {tFooter("home")}
            </Link>
            <Link
              className="hover:text-accent transition-colors hover:underline"
              href={"/services"}
            >
              {tFooter("services")}
            </Link>
            <Link
              className="hover:text-accent transition-colors hover:underline"
              href={"/contact"}
            >
              {tFooter("contacts")}
            </Link>
          </div>
        </div>

        {/* Social */}
        <div className="xsm:pl-2 flex flex-col gap-4 p-2 pl-12">
          <h1 className="from-foreground to-accent bg-gradient-to-b bg-clip-text text-xl text-transparent">
            {tFooter("follow_us")}
          </h1>
          <div className="flex gap-8 py-4 text-sm">
            <Link href={brandX} target="_blank">
              <TwitterIcon className="fill-foreground h-6 w-6 transition-opacity hover:opacity-80" />
            </Link>
            <Link href={brandFB} target="_blank">
              <FacebookIcon className="fill-foreground h-6 w-6 transition-opacity hover:opacity-80" />
            </Link>
            <Link href={brandYT} target="_blank">
              <YoutubeIcon className="fill-foreground h-6 w-6 transition-opacity hover:opacity-80" />
            </Link>
            <Link target="_blank" href={brandIG}>
              <InstagramIcon className="fill-foreground h-6 w-6 transition-opacity hover:opacity-80" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer footer */}
      <div className="flex w-full max-w-screen-xl flex-col items-center justify-around gap-3 p-2 text-xs md:flex-row">
        <div>
          {/* &#169;{new Date().getFullYear()} {brandName} {t("rights_reserved")} */}
          &#169;2025 {brandName} {tFooter("rights_reserved")}
        </div>
        <div className="flex flex-1 flex-wrap justify-center gap-4">
          <Link
            className="hover:text-accent transition-colors"
            href={"/privacy-policy"}
          >
            {tFooter("privacy_policy")}
          </Link>
          <Link
            className="hover:text-accent transition-colors"
            href={"/disclaimer"}
          >
            {tFooter("disclaimer")}
          </Link>
        </div>
        <div className="text-right">
          {tFooter("developed_by")}{" "}
          <NextLink
            target="_about"
            href={"https://warlockja.com"}
            className="hover:text-accent transition-opacity"
          >
            WarlockJa
          </NextLink>
        </div>
      </div>
    </footer>
  );
}
