import AnimatedComponent from "@/components/UniversalComponents/AnimatedComponent";
import CustomeHeaderText from "@/components/CustomeHeaderText";
import ContactForm from "@/components/Contacts/ContactForm/ContactForm";
import ParallaxWrapper from "@/components/UniversalComponents/ParallaxWrapper";
import { getTranslations } from "next-intl/server";

export default async function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tContact = await getTranslations("ContactForm");

  return (
    <>
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
