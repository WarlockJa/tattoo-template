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
import { Textarea } from "@/components/ui/textarea";
import { SelectArtist } from "@cf/db/schemaArtists";
import { updateArtistAction } from "../_actions/artists";
import ImageSelectorFormPart from "../ImageSelectorFormPart";

export default function UpdateArtistForm({
  imagesData,
  artist,
}: {
  imagesData: SelectImage[];
  artist?: SelectArtist;
}) {
  const tErrors = useTranslations("Errors");
  const tAdminPage = useTranslations("AdminPage");
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
      toast(tAdminPage("product_updated"), {
        description: input.name,
      });

      form.reset();
    },
  });

  const form = useForm<z.infer<typeof updateArtistSchema>>({
    resolver: zodResolver(updateArtistSchema),
    defaultValues: artist,
  });

  function onSubmit(values: z.infer<typeof updateArtistSchema>) {
    execute(values);
  }

  const formBlock1Description = useWatch({
    control: form.control,
    name: "block1Description",
  });
  const formBlock2Description = useWatch({
    control: form.control,
    name: "block2Description",
  });
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
  const formSpecialty = useWatch({
    control: form.control,
    name: "specialty",
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

  // TODO translate
  if (!artist) return <p>Provide Artist Data</p>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-6 p-2 md:grid-cols-2"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    // TODO translate
                    placeholder={"Artist name"}
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
                <FormLabel>Artist&apos; Image:</FormLabel>
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
            name="specialty"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ""}
                    // TODO translate
                    placeholder={"Short artist specialty description"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="block1ImageId"
            render={({ field }) => (
              <FormItem>
                {/* TODO translate */}
                <FormLabel>Artist Card Main Image1:</FormLabel>
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
            name="block1Description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    // TODO translate
                    placeholder={"Block 1 text"}
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
                {/* TODO translate */}
                <FormLabel>Artist Card Main Image2:</FormLabel>
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
            name="block2Description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    // TODO translate
                    placeholder={"Block 2 text"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageFeed1ImageId"
            render={({ field }) => (
              <FormItem>
                {/* TODO translate */}
                <FormLabel>Artist portofolio image 1:</FormLabel>
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
                {/* TODO translate */}
                <FormLabel>Artist portofolio image 2:</FormLabel>
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

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="imageFeed3ImageId"
            render={({ field }) => (
              <FormItem>
                {/* TODO translate */}
                <FormLabel>Artist portofolio image 3:</FormLabel>
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
                {/* TODO translate */}
                <FormLabel>Artist portofolio image 4:</FormLabel>
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
                {/* TODO translate */}
                <FormLabel>Artist portofolio image 5:</FormLabel>
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
                {/* TODO translate */}
                <FormLabel>Artist portofolio image 6:</FormLabel>
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
                {/* TODO translate */}
                <FormLabel>Artist portofolio image 7:</FormLabel>
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
                {/* TODO translate */}
                <FormLabel>Artist portofolio image 8:</FormLabel>
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
            (formBlock1Description === artist.block1Description &&
              formBlock1ImageId === artist.block1ImageId &&
              formBlock2Description === artist.block2Description &&
              formBlock2ImageId === artist.block2ImageId &&
              formImageId === artist.imageId &&
              formName === artist.name &&
              formSpecialty === artist.specialty &&
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
          {/* TODO translate */}
          update Artist Data
        </LoaderButton>
      </form>
    </Form>
  );
}
