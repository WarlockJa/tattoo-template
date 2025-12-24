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
import ImageSelectorFormPart from "../ImageSelectorFormPart";
import { SelectImage } from "../../../../../../db/schemaImage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { servicesData } from "@/components/Services/servicesData";
import { Dispatch } from "react";
import { GetCachedInstagrams } from "@/lib/cache/instagram/getCachedInstagramsPage";

export default function AddInstagramForm({
  imagesData,
  setInstagramsData,
}: {
  imagesData: SelectImage[];
  setInstagramsData: Dispatch<React.SetStateAction<GetCachedInstagrams[]>>;
}) {
  const tErrors = useTranslations("Errors");
  const tFeedImagesForms = useTranslations("FeedImagesForms");
  const tServices = useTranslations("Services");

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

    onSuccess({ data, input }) {
      toast(tFeedImagesForms("added_new_feed_image"), {
        description: input.url,
      });

      if (data && data?.length > 0) {
        const newImageData = imagesData.find(
          (img) => img.imageId === data[0].imageId,
        );
        if (!newImageData) return;

        const newFeedImage: GetCachedInstagrams = {
          instagramId: data[0].instagramId,
          type: data[0].type,
          url: data[0].url,
          image: newImageData,
        };
        setInstagramsData((prev) => [newFeedImage, ...prev]);
      }

      form.reset();
    },
  });

  const form = useForm<z.infer<typeof addInstagramSchema>>({
    resolver: zodResolver(addInstagramSchema),
    defaultValues: {
      url: "",
      type: "tattoo",
    },
  });

  function onSubmit(values: z.infer<typeof addInstagramSchema>) {
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
              <FormLabel>{tFeedImagesForms("external_url")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={tFeedImagesForms("external_url")}
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
              <FormLabel>{tFeedImagesForms("depicted_service")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={tFeedImagesForms("select_service")}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {servicesData.map((srv) => (
                    <SelectItem key={srv.href} value={srv.name}>
                      {tServices(srv.name)}
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
            <FormItem className="w-64">
              <FormLabel>{tFeedImagesForms("select_image")}:</FormLabel>
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

        <LoaderButton
          isDisabled={status === "executing" || formImageId === undefined}
          isLoading={status === "executing"}
          variant={"secondary"}
          className="w-full cursor-pointer rounded-none border text-xl"
        >
          <Upload />
          {tFeedImagesForms("add_new_feed_image")}
        </LoaderButton>
      </form>
    </Form>
  );
}
