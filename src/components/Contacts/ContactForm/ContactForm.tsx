"use client";
import { Mail } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LoaderButton } from "@/components/UniversalComponents/LoaderButton";
import { useAction } from "next-safe-action/hooks";
import { sendMessageAction } from "./actions/sendMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { messageSchema } from "./schemas";
import { z } from "zod";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { Locale } from "@/i18n/config";

export default function ContactForm() {
  const tContact = useTranslations("ContactForm");
  const t = useTranslations("Errors");
  const locale = useLocale() as Locale;

  const { execute, status } = useAction(sendMessageAction, {
    onSuccess() {
      toast(tContact("message_sent_toast_title"), {
        description: tContact("message_sent_toast_description"),
      });

      form.reset();
    },
    onError({ error }) {
      if (error.serverError === "RateLimitError") {
        toast(t("rate_limit_title"), {
          description: t("rate_limit_description"),
        });

        return;
      }

      toast(
        <SonnerErrorCard
          title={t("general_error_title")}
          errors={JSON.stringify(error)}
        />,
      );
    },
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      locale: locale,
    },
  });

  function onSubmit(values: z.infer<typeof messageSchema>) {
    execute(values);
  }

  return (
    <div className="xsm:px-10 bg-background/90 text-foreground m-auto w-full max-w-xl py-10 lg:flex lg:max-w-(--breakpoint-lg)">
      <div className="mb-8 flex flex-col items-center pl-8 lg:mt-4 lg:flex-1 lg:items-start">
        <div className="relative">
          <p className="text-xl">
            {tContact("got_any_question").toLocaleUpperCase()}
          </p>
          <h2 className="pr-2 text-3xl lg:text-5xl">
            {tContact("send_us_a_message").toLocaleUpperCase()}
          </h2>
          <div className="absolute -bottom-2 -left-4 h-8 w-24 border-b-2 border-l-2 lg:-bottom-8 lg:-left-12 lg:h-12 lg:w-2/5"></div>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 lg:w-1/2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="focus:border-primary-foreground w-full rounded-none px-4 py-6 text-xl"
                    placeholder={`${tContact("name")}*`}
                    type="text"
                    max={60}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="focus:border-primary-foreground w-full rounded-none px-4 py-6 text-xl"
                    placeholder={`${tContact("phone")}*`}
                    type="tel"
                    max={20}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="focus:border-primary-foreground w-full rounded-none px-4 py-6 text-xl"
                    placeholder={`${tContact("email")}*`}
                    type="email"
                    max={60}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    className="focus:border-primary-foreground w-full resize-none rounded-none px-4 text-xl"
                    maxLength={500}
                    rows={5}
                    placeholder={`${tContact("your_message")}*`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <LoaderButton
            isDisabled={
              status === "executing" ||
              form.getValues("email") === "" ||
              form.getValues("message") === "" ||
              form.getValues("name") === "" ||
              form.getValues("phone") === ""
            }
            isLoading={status === "executing"}
            variant={"secondary"}
            className="border-primary-foreground bg-primary text-primary-foreground hover:bg-accent hover:text-background w-full rounded-none border text-xl"
          >
            <Mail />
            {tContact("send_message")}
          </LoaderButton>
        </form>
      </Form>
    </div>
  );
}
