import AnimatedComponent from "@/components/UniversalComponents/AnimatedComponent";
import CustomeHeaderText from "@/components/CustomeHeaderText";
import ContactForm from "@/components/Contacts/ContactForm/ContactForm";
import ParallaxWrapper from "@/components/UniversalComponents/ParallaxWrapper";
import { getTranslations } from "next-intl/server";
import WhatsappButton from "@/components/WhatsappButton";

export default async function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tContact = await getTranslations("ContactForm");

  return (
    <>
      <WhatsappButton
        className="bg-foreground/80 fixed bottom-2 left-2 z-10 rounded-2xl p-1.5 md:bottom-10 md:left-10"
        iconClassName="w-12 h-12"
      />
      {children}
      <div className="mx-auto w-screen max-w-screen-lg">
        <AnimatedComponent once>
          <CustomeHeaderText text={tContact("send_us_a_message")} />
        </AnimatedComponent>
      </div>
      <ParallaxWrapper>
        <ContactForm />
      </ParallaxWrapper>
    </>
  );
}
