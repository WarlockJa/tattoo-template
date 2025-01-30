"use client";

import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { addProductAction } from "./_actions/product";
import { toast } from "sonner";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { addProductSchema } from "./_actions/schemas";
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
import { Switch } from "@/components/ui/switch";
import ImageSelector from "@/app/admin/_components/ImagePrimitive/_components/ImageSelector";
import { SelectImage } from "@cf/db/schemaImage";
import { Textarea } from "@/components/ui/textarea";

export default function AddProductForm({
  imagesDate,
}: {
  imagesDate: SelectImage[];
}) {
  const tErrors = useTranslations("Errors");
  const tAdminPage = useTranslations("AdminPage");
  const { execute, status } = useAction(addProductAction, {
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

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      special: false,
      imageId: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof addProductSchema>) {
    execute(values);
  }

  const formImageId = useWatch({
    control: form.control,
    name: "imageId",
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
                    placeholder={tAdminPage("product_name")}
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={tAdminPage("product_description")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <FormLabel>{tAdminPage("product_price")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={tAdminPage("product_price")}
                    type="number"
                    className="w-40"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="special"
            render={({ field }) => (
              <FormItem className="hover:bg-foreground/10 flex items-center justify-between space-y-0 py-1 transition-colors">
                <FormLabel>{tAdminPage("product_is_special")}</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ImageSelector
          imagesData={imagesDate}
          selectImage={(image) => form.setValue("imageId", image.imageId)}
          selectedImage={formImageId}
          unrestricted
        />

        <LoaderButton
          isDisabled={
            status === "executing" ||
            form.getValues("name") === "" ||
            form.getValues("description") === "" ||
            form.getValues("price") === 0
          }
          isLoading={status === "executing"}
          variant={"secondary"}
          className="border-primary-foreground bg-primary text-primary-foreground hover:bg-accent hover:text-primary w-full rounded-none border text-xl md:col-span-2"
        >
          <Upload />
          {tAdminPage("add_product")}
        </LoaderButton>
      </form>
    </Form>
  );
}
