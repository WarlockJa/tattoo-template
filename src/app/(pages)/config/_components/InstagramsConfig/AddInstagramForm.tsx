"use client";

import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { addInstagramSchema } from "../_actions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderButton } from "@/components/UniversalComponents/LoaderButton";
import { Upload } from "lucide-react";
import { addInstagramAction } from "../_actions/instagrams";

export default function AddInstagramForm() {
  const tErrors = useTranslations("Errors");
  // const tAdminPage = useTranslations("AdminPage");
  const { execute, status } = useAction(addInstagramAction, {
    onError({ error }) {
      if (error.serverError === "RateLimitError") {
        toast(tErrors("rate_limit_title"), {
          description: tErrors("rate_limit_description"),
        });

        return;
      }

      if (error.serverError === "UnauthorisedAccess") {
        toast(tErrors("insufficient_rights_title"), {
          description: tErrors("insufficient_rights_general_description"),
        });

        return;
      }

      if (error.serverError) {
        toast(
          <SonnerErrorCard
            title={tErrors("general_error_title")}
            errors={error.serverError}
          />,
        );

        return;
      }

      toast(
        <SonnerErrorCard
          title={tErrors("general_error_title")}
          errors={JSON.stringify(error)}
        />,
      );
    },

    onSuccess({ input }) {
      // TODO translate
      toast("Added new Instagram media", {
        description: input.url,
      });

      form.reset();
    },
  });

  const form = useForm<z.infer<typeof addInstagramSchema>>({
    resolver: zodResolver(addInstagramSchema),
    defaultValues: {
      url: "",
    },
  });

  function onSubmit(values: z.infer<typeof addInstagramSchema>) {
    execute(values);
  }

  const formUrl = useWatch({
    control: form.control,
    name: "url",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-1">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram URL</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  // TODO translate
                  placeholder={"Instagram url"}
                  type="text"
                  max={255}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoaderButton
          isDisabled={status === "executing" || formUrl === ""}
          isLoading={status === "executing"}
          variant={"secondary"}
          className="col-span-2 w-full cursor-pointer rounded-none border text-xl"
        >
          <Upload />
          {/* TODO translate */}
          Add Instagram
        </LoaderButton>
      </form>
    </Form>
  );
}
