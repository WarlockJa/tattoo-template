"use client";

import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { addArtistSchema } from "../_actions/schemas";
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
import { SelectImage } from "../../../../../../db/schemaImage";
import { addArtistAction } from "../_actions/artists";
import ImageSelectorFormPart from "../ImageSelectorFormPart";

export default function AddArtistForm({
  imagesData,
}: {
  imagesData: SelectImage[];
}) {
  const tErrors = useTranslations("Errors");
  const tArtistForms = useTranslations("ArtistForms");
  const { execute, status } = useAction(addArtistAction, {
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
      toast(tArtistForms("added_new_artist"), {
        description: input.name,
      });

      form.reset();
    },
  });

  const form = useForm<z.infer<typeof addArtistSchema>>({
    resolver: zodResolver(addArtistSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof addArtistSchema>) {
    execute(values);
  }

  const formName = useWatch({
    control: form.control,
    name: "name",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 p-2 px-1"
      >
        <div className="mx-auto w-full max-w-md space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={tArtistForms("artists_name")}
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
                <FormLabel>{tArtistForms("artists_image")}</FormLabel>
                <FormControl>
                  <ImageSelectorFormPart
                    value={field.value}
                    onChange={field.onChange}
                    imagesData={imagesData}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <FormField
            control={form.control}
            name="block1ImageId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {tArtistForms("main_image", { number: 1 })}
                </FormLabel>
                <FormControl>
                  <ImageSelectorFormPart
                    value={field.value}
                    onChange={field.onChange}
                    imagesData={imagesData}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="block2ImageId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {tArtistForms("main_image", { number: 2 })}
                </FormLabel>
                <FormControl>
                  <ImageSelectorFormPart
                    value={field.value}
                    onChange={field.onChange}
                    imagesData={imagesData}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <FormField
            control={form.control}
            name="imageFeed1ImageId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {tArtistForms("portfolio_image", { number: 1 })}
                </FormLabel>
                <FormControl>
                  <ImageSelectorFormPart
                    value={field.value}
                    onChange={field.onChange}
                    imagesData={imagesData}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageFeed2ImageId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {tArtistForms("portfolio_image", { number: 2 })}
                </FormLabel>
                <FormControl>
                  <ImageSelectorFormPart
                    value={field.value}
                    onChange={field.onChange}
                    imagesData={imagesData}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageFeed3ImageId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {tArtistForms("portfolio_image", { number: 3 })}
                </FormLabel>
                <FormControl>
                  <ImageSelectorFormPart
                    value={field.value}
                    onChange={field.onChange}
                    imagesData={imagesData}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageFeed4ImageId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {tArtistForms("portfolio_image", { number: 4 })}
                </FormLabel>
                <FormControl>
                  <ImageSelectorFormPart
                    value={field.value}
                    onChange={field.onChange}
                    imagesData={imagesData}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageFeed5ImageId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {tArtistForms("portfolio_image", { number: 5 })}
                </FormLabel>
                <FormControl>
                  <ImageSelectorFormPart
                    value={field.value}
                    onChange={field.onChange}
                    imagesData={imagesData}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageFeed6ImageId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {tArtistForms("portfolio_image", { number: 6 })}
                </FormLabel>
                <FormControl>
                  <ImageSelectorFormPart
                    value={field.value}
                    onChange={field.onChange}
                    imagesData={imagesData}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageFeed7ImageId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {tArtistForms("portfolio_image", { number: 7 })}
                </FormLabel>
                <FormControl>
                  <ImageSelectorFormPart
                    value={field.value}
                    onChange={field.onChange}
                    imagesData={imagesData}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageFeed8ImageId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {tArtistForms("portfolio_image", { number: 8 })}
                </FormLabel>
                <FormControl>
                  <ImageSelectorFormPart
                    value={field.value}
                    onChange={field.onChange}
                    imagesData={imagesData}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <LoaderButton
          isDisabled={status === "executing" || formName === ""}
          isLoading={status === "executing"}
          variant={"secondary"}
          className="col-span-2 w-full cursor-pointer rounded-none border text-xl"
        >
          <Upload />
          {tArtistForms("add_artist")}
        </LoaderButton>
      </form>
    </Form>
  );
}
