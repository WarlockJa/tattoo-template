"use client";

import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { updateInstagramSchema } from "../_actions/schemas";
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
import { updateInstagramAction } from "../_actions/instagrams";
import ImageSelectorFormPart from "../ImageSelectorFormPart";
import { SelectImage } from "@cf/db/schemaImage";
import { SelectInstagram } from "@cf/db/schemaInstagram";
import { useEffect } from "react";

export default function UpdateInstagramForm({
  imagesData,
  instagram,
}: {
  imagesData: SelectImage[];
  instagram: SelectInstagram;
}) {
  const tErrors = useTranslations("Errors");
  // const tAdminPage = useTranslations("AdminPage");
  const { execute, status } = useAction(updateInstagramAction, {
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
      toast("Added new feed image", {
        description: input.url,
      });

      form.reset();
    },
  });

  // updating form values on selected image change
  useEffect(() => {
    if (!instagram) return;

    form.setValue("imageId", instagram.imageId);
    form.setValue("instagramId", instagram.instagramId);
    form.setValue("url", instagram.url ?? "");
  }, [instagram]);

  const form = useForm<z.infer<typeof updateInstagramSchema>>({
    resolver: zodResolver(updateInstagramSchema),
    defaultValues: {
      ...instagram,
      url: instagram.url ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof updateInstagramSchema>) {
    execute(values);
  }

  const formImageId = useWatch({
    control: form.control,
    name: "imageId",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-1">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              {/* TODO translate */}
              <FormLabel>External URL</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  // TODO translate
                  placeholder={"External url"}
                  type="text"
                  max={255}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageId"
          render={({ field }) => (
            <FormItem>
              {/* TODO translate */}
              <FormLabel>Select Image:</FormLabel>
              <FormControl>
                <div className="aspect-video h-44">
                  <ImageSelectorFormPart
                    value={field.value}
                    onChange={field.onChange}
                    imagesData={imagesData}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoaderButton
          isDisabled={status === "executing" || formImageId === undefined}
          isLoading={status === "executing"}
          variant={"secondary"}
          className="w-full cursor-pointer rounded-none border text-xl"
        >
          <Upload />
          {/* TODO translate */}
          Update Instagram
        </LoaderButton>
      </form>
    </Form>
  );
}
