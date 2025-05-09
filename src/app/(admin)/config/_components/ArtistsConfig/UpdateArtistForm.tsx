"use client";

import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { updateArtistSchema } from "../_actions/schemas";
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
import { SelectImage } from "@cf/db/schemaImage";
import { SelectArtist } from "@cf/db/schemaArtists";
import { updateArtistAction } from "../_actions/artists";
import ImageSelectorFormPart from "../ImageSelectorFormPart";
import { useEffect } from "react";

export default function UpdateArtistForm({
  imagesData,
  artist,
}: {
  imagesData: SelectImage[];
  artist?: SelectArtist;
}) {
  const tErrors = useTranslations("Errors");
  const tArtistForms = useTranslations("ArtistForms");
  const { execute, status } = useAction(updateArtistAction, {
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
      toast(tArtistForms("updated_artist"), {
        description: input.name,
      });
    },
  });

  const form = useForm<z.infer<typeof updateArtistSchema>>({
    resolver: zodResolver(updateArtistSchema),
    defaultValues: artist,
  });

  function onSubmit(values: z.infer<typeof updateArtistSchema>) {
    execute(values);
  }

  const formBlock1ImageId = useWatch({
    control: form.control,
    name: "block1ImageId",
  });
  const formBlock2ImageId = useWatch({
    control: form.control,
    name: "block2ImageId",
  });
  const formImageId = useWatch({
    control: form.control,
    name: "imageId",
  });
  const formName = useWatch({
    control: form.control,
    name: "name",
  });
  const formImageFeed1ImageId = useWatch({
    control: form.control,
    name: "imageFeed1ImageId",
  });
  const formImageFeed2ImageId = useWatch({
    control: form.control,
    name: "imageFeed2ImageId",
  });
  const formImageFeed3ImageId = useWatch({
    control: form.control,
    name: "imageFeed3ImageId",
  });
  const formImageFeed4ImageId = useWatch({
    control: form.control,
    name: "imageFeed4ImageId",
  });
  const formImageFeed5ImageId = useWatch({
    control: form.control,
    name: "imageFeed5ImageId",
  });
  const formImageFeed6ImageId = useWatch({
    control: form.control,
    name: "imageFeed6ImageId",
  });
  const formImageFeed7ImageId = useWatch({
    control: form.control,
    name: "imageFeed7ImageId",
  });
  const formImageFeed8ImageId = useWatch({
    control: form.control,
    name: "imageFeed8ImageId",
  });

  // updating form values on selected artist change
  useEffect(() => {
    if (!artist) return;

    form.setValue("artistId", artist.artistId);
    form.setValue("block1ImageId", artist.block1ImageId);
    form.setValue("block2ImageId", artist.block2ImageId);
    form.setValue("imageId", artist.imageId);
    form.setValue("name", artist.name);
    form.setValue("imageFeed1ImageId", artist.imageFeed1ImageId);
    form.setValue("imageFeed2ImageId", artist.imageFeed2ImageId);
    form.setValue("imageFeed3ImageId", artist.imageFeed3ImageId);
    form.setValue("imageFeed4ImageId", artist.imageFeed4ImageId);
    form.setValue("imageFeed5ImageId", artist.imageFeed5ImageId);
    form.setValue("imageFeed6ImageId", artist.imageFeed6ImageId);
    form.setValue("imageFeed7ImageId", artist.imageFeed7ImageId);
    form.setValue("imageFeed8ImageId", artist.imageFeed8ImageId);
  }, [artist]);

  if (!artist) return <p>{tArtistForms("provide_artists_data")}</p>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-2">
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
                    value={field.value ?? undefined}
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
                    value={field.value ?? undefined}
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
                    value={field.value ?? undefined}
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
                    value={field.value ?? undefined}
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
                    value={field.value ?? undefined}
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
                    value={field.value ?? undefined}
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
                    value={field.value ?? undefined}
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
                    value={field.value ?? undefined}
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
                    value={field.value ?? undefined}
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
                    value={field.value ?? undefined}
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
                    value={field.value ?? undefined}
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
          isDisabled={
            status === "executing" ||
            (formBlock1ImageId === artist.block1ImageId &&
              formBlock2ImageId === artist.block2ImageId &&
              formImageId === artist.imageId &&
              formName === artist.name &&
              formImageFeed1ImageId === artist.imageFeed1ImageId &&
              formImageFeed2ImageId === artist.imageFeed2ImageId &&
              formImageFeed3ImageId === artist.imageFeed3ImageId &&
              formImageFeed4ImageId === artist.imageFeed4ImageId &&
              formImageFeed5ImageId === artist.imageFeed5ImageId &&
              formImageFeed6ImageId === artist.imageFeed6ImageId &&
              formImageFeed7ImageId === artist.imageFeed7ImageId &&
              formImageFeed8ImageId === artist.imageFeed8ImageId)
          }
          isLoading={status === "executing"}
          variant={"secondary"}
          className="col-span-2 w-full cursor-pointer rounded-none border text-xl"
        >
          <Upload />
          {tArtistForms("update_artist")}
        </LoaderButton>
      </form>
    </Form>
  );
}
