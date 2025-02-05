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
import { Dispatch, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { servicesData, ServicesType } from "@/components/Services/servicesData";
import { GetCachedInstagrams } from "@/lib/cache/instagram/getCachedInstagramsPage";

export default function UpdateInstagramForm({
  imagesData,
  instagram,
  setSelectedInstagram,
  setInstagramsData,
}: {
  imagesData: SelectImage[];
  instagram: SelectInstagram;
  setSelectedInstagram: Dispatch<
    React.SetStateAction<SelectInstagram | undefined>
  >;
  setInstagramsData: Dispatch<React.SetStateAction<GetCachedInstagrams[]>>;
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
      toast("Updated feed image", {
        description: input.url,
      });

      // updating client side selected instagram data
      setSelectedInstagram((prev) =>
        prev ? { ...prev, ...input } : undefined,
      );

      // updating client side instagrams
      setInstagramsData((prev) =>
        prev.map((item) =>
          item.instagramId === input.instagramId ? { ...item, ...input } : item,
        ),
      );
    },
  });

  // updating form values on selected image change
  useEffect(() => {
    if (!instagram) return;

    form.setValue("imageId", instagram.imageId);
    form.setValue("instagramId", instagram.instagramId);
    form.setValue("url", instagram.url ?? "");
    form.setValue("type", (instagram.type as ServicesType) ?? "tattoo");
  }, [instagram.instagramId]);

  const form = useForm<z.infer<typeof updateInstagramSchema>>({
    resolver: zodResolver(updateInstagramSchema),
    defaultValues: {
      ...instagram,
      url: instagram.url ?? "",
      type: instagram.type as ServicesType,
    },
  });

  function onSubmit(values: z.infer<typeof updateInstagramSchema>) {
    execute(values);
  }

  const formImageId = useWatch({
    control: form.control,
    name: "imageId",
  });
  const formUrl = useWatch({
    control: form.control,
    name: "url",
  });
  const formType = useWatch({
    control: form.control,
    name: "type",
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
          name="type"
          render={({ field }) => (
            <FormItem>
              {/* TODO translate */}
              <FormLabel>Depicted Service</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* TODO translate */}
                  {servicesData.map((srv) => (
                    <SelectItem key={srv.href} value={srv.name}>
                      {srv.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          isDisabled={
            status === "executing" ||
            formImageId === undefined ||
            (formUrl === instagram.url &&
              formImageId === instagram.imageId &&
              formType === instagram.type)
          }
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
