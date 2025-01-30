import {
  brandAddress,
  brandEmail,
  brandName,
  brandPhone,
  brandWhatsApp,
} from "@/appConfig";
import WhatsAppIcon from "@/components/Icons/WhatsAppIcon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function AddressCard() {
  // const t = useTranslations("AddressCard");
  return (
    <Card className="m-auto w-full rounded-none border-foreground text-lg shadow-lg md:m-0 md:w-fit md:min-w-80">
      <CardHeader>
        <CardTitle className="m-auto text-4xl">{brandName}</CardTitle>
      </CardHeader>
      <CardContent className="m-auto w-fit">
        <div className="flex flex-col gap-3 font-sans">
          <div>{brandAddress[0]},</div>
          <div>{brandAddress[1]},</div>
          <div>{brandAddress[2]}</div>
          <Link
            href={`tel:${brandPhone.number}`}
            className="flex items-center gap-2 font-sans transition-colors hover:text-accent"
          >
            <Phone />
            {brandPhone.string}
          </Link>
          <Link
            href={`mailto:${brandEmail}`}
            className="flex items-center gap-2 font-sans transition-colors hover:text-accent"
          >
            <Mail />
            {brandEmail}
          </Link>
          <Link
            href={`https://wa.me/${brandWhatsApp.number}`}
            target="_blank"
            className="flex items-center gap-2 font-sans transition-colors hover:text-accent"
          >
            <WhatsAppIcon className="h-5 w-5 fill-current stroke-current" />{" "}
            {brandWhatsApp.string}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
