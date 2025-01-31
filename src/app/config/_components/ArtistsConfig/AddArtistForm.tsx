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
import { SelectImage } from "@cf/db/schemaImage";
import { Textarea } from "@/components/ui/textarea";
import { addArtistAction } from "../_actions/artists";
import ImageSelectorFormPart from "../ImageSelectorFormPart";

export default function AddArtistForm({
  imagesData,
}: {
  imagesData: SelectImage[];
}) {
  const tErrors = useTranslations("Errors");
  const tAdminPage = useTranslations("AdminPage");
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
      toast(tAdminPage("added_new_product"), {
        description: input.name,
      });

      form.reset();
    },
  });

  const form = useForm<z.infer<typeof addArtistSchema>>({
    resolver: zodResolver(addArtistSchema),
    defaultValues: {
      name: "",
      specialty: "",
      block1Description: "",
      block2Description: "",
    },
  });

  function onSubmit(values: z.infer<typeof addArtistSchema>) {
    execute(values);
  }

  const formName = useWatch({
    control: form.control,
    name: "name",
  });
  const formBlock1Description = useWatch({
    control: form.control,
    name: "block1Description",
  });
  const formBlock2Description = useWatch({
    control: form.control,
    name: "block2Description",
  });

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
            name="specialty"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
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
                {/* TODO translate */}
                <FormLabel>Artist portofolio image 2:</FormLabel>
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
                {/* TODO translate */}
                <FormLabel>Artist portofolio image 4:</FormLabel>
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
                {/* TODO translate */}
                <FormLabel>Artist portofolio image 5:</FormLabel>
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
                {/* TODO translate */}
                <FormLabel>Artist portofolio image 6:</FormLabel>
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
                {/* TODO translate */}
                <FormLabel>Artist portofolio image 7:</FormLabel>
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
                {/* TODO translate */}
                <FormLabel>Artist portofolio image 8:</FormLabel>
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
          isDisabled={
            status === "executing" ||
            formName === "" ||
            formBlock1Description === "" ||
            formBlock2Description === ""
          }
          isLoading={status === "executing"}
          variant={"secondary"}
          className="col-span-2 w-full cursor-pointer rounded-none border text-xl"
        >
          <Upload />
          {/* TODO translate */}
          Add Artist
        </LoaderButton>
      </form>
    </Form>
  );
}
