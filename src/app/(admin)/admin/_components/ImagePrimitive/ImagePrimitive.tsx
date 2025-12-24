/*
ImagePrimitive is the base component used by the blog to CRUD images
provides interface for file selection, Drag and Drop, and URL parsing
URL and files are validated on the client before being passed to the
server action as File[]
*/

"use client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { CloudUpload } from "lucide-react";
import ImageSelector from "./_components/ImageSelector";
import { MAX_FILE_SIZE } from "@/appConfig";
import { useTranslations } from "next-intl";
import { HookActionStatus, useAction } from "next-safe-action/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createId } from "@paralleldrive/cuid2";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { createImagesAction } from "./actions/image";
import { getFileExtension } from "@/lib/getFileExtension";
import { TImageFile } from "./actions/schemas";
import { SelectImage } from "../../../../../../db/schemaImage";

interface FileUploadItem extends TImageFile {
  status: "pending" | "success" | "error";
}

// images upload handler
const handleUpload = ({
  execute,
  status,
  imageFiles,
  unrestricted,
}: {
  execute: (formData: FormData) => void;
  status: HookActionStatus;
  imageFiles: FileUploadItem[];
  unrestricted?: boolean;
}) => {
  if (status === "executing") return;
  const formData = new FormData();
  imageFiles.forEach((item) => {
    formData.append("imageFiles", item.file);
    formData.append("imageWidths", item.width.toString());
    formData.append("imageHeigths", item.height.toString());
  });
  formData.append("restricted", JSON.stringify(unrestricted ? false : true));

  execute(formData);
};

export default function ImagePrimitive({
  imagesData,
  unrestricted,
}: {
  imagesData: SelectImage[];
  unrestricted?: boolean;
}) {
  const tErrors = useTranslations("Errors");
  const tBlogImage = useTranslations("Blog.ImagePart");
  // input file ref
  const inputRef = useRef<HTMLInputElement>(null);
  // file list
  const [fileList, setFileList] = useState<FileUploadItem[]>([]);
  const [executeFlag, setExecuteFlag] = useState<number>(0);
  // url input value
  const [url, setUrl] = useState("");

  const { execute, status } = useAction(createImagesAction, {
    onError({ error, input }) {
      // unauthorised access
      if (error.serverError === "UnauthorisedAccess") {
        toast(tErrors("insufficient_rights_title"), {
          description: tErrors("insufficient_rights_update_blog"),
        });

        return;
      }

      // rate limit exceeded
      if (error.serverError === "RateLimitError") {
        toast(tErrors("rate_limit_title"), {
          description: tErrors("too_many_image_uploads"),
        });

        return;
      }

      // user storage quota exceeded
      if (error.serverError === "R2StorageLimitExceeded") {
        toast(tErrors("storage_quota_exceeded_title"), {
          description: tErrors("storage_quota_exceeded_description"),
        });

        return;
      }

      // generic server error toast
      if (error.serverError) {
        toast(
          <SonnerErrorCard
            title={tErrors("general_error_title")}
            errors={error.serverError}
          />,
        );

        return;
      }

      // invalid image type
      if (error.validationErrors?.imageFiles) {
        // asserting form types
        const inputImagesData = (input as FormData).getAll(
          "imageFiles",
        ) as Record<number, File>;

        const imageErrors = (
          <ol className="list-disc">
            {Object.entries(error.validationErrors?.imageFiles).map((err) => (
              <li key={err[0]}>
                {`${inputImagesData[Number(err[0])].name}: ${err[1] && Object.values(err[1])} \n`}
              </li>
            ))}
          </ol>
        );

        toast(
          <SonnerErrorCard
            title={tErrors("adding_image_error")}
            errors={imageErrors}
          />,
        );

        return;
      }

      toast(
        <SonnerErrorCard
          title={tErrors("general_error_title")}
          errors={JSON.stringify(error.validationErrors)}
        />,
      );
    },

    onSuccess({ data }) {
      // toast("DATA", { description: JSON.stringify(data) });
      const newImages = data && data.filter((item) => item !== undefined);
      if (newImages) {
        // // adding new blog images to the local state
        // setImages((prev) => [...prev, ...newImages]);

        // showing toast notification
        const uploadedImages = (
          <ol className="list-disc">
            {newImages.map((img) => (
              <li key={img.name}>{img.name}</li>
            ))}
          </ol>
        );

        toast(tBlogImage("primitive_images_uploaded"), {
          description: uploadedImages,
        });
      }
    },
  });

  // file list processing
  // when all files in fileList passed <img> check executeFlag will be equal
  // to the length of the fileList, in which case erroneous files shown as a toast and
  // proper image files passed to the server action
  // NOTE: passing <img> does not guarantee server action success as it will exact its
  // own validation on user rights, storage quota, and rate of invocation
  useEffect(() => {
    if (executeFlag === 0 || executeFlag !== fileList.length) return;

    // processing errors
    if (fileList.findIndex((item) => item.status === "error") !== -1) {
      const imageErrors = (
        <ol className="list-disc">
          {fileList
            .filter((entry) => entry.status === "error")
            .map((errorEntry) => (
              <li key={errorEntry.file.name}>{errorEntry.file.name}</li>
            ))}
        </ol>
      );

      toast(
        <SonnerErrorCard
          title={tErrors("files_are_not_valid_images")}
          errors={imageErrors}
        />,
      );
    }

    // processing valid images
    if (fileList.findIndex((item) => item.status === "success") !== -1) {
      handleUpload({
        // blogId,
        status,
        execute,
        imageFiles: fileList
          .filter((entry) => entry.status === "success")
          .map((validImage) => validImage),
        unrestricted,
      });
    }

    setFileList([]);
    setExecuteFlag(0);
  }, [executeFlag]);

  // checking added files for being a proper image via <img> element
  // adding width and height to the execute data object
  useEffect(() => {
    fileList
      .filter((item) => item.status === "pending")
      .map((item) => {
        const img = new Image();

        img.src = window.URL.createObjectURL(item.file);

        img.onload = () => {
          setFileList((prev) =>
            prev.map((entry) =>
              entry.file.name === item.file.name
                ? {
                    file: item.file,
                    status: "success",
                    height: img.height,
                    width: img.width,
                  }
                : entry,
            ),
          );
          setExecuteFlag((prev) => prev + 1);
        };
        img.onerror = () => {
          setFileList((prev) =>
            prev.map((entry) =>
              entry.file.name === item.file.name
                ? { file: item.file, status: "error", height: 0, width: 0 }
                : entry,
            ),
          );
          setExecuteFlag((prev) => prev + 1);
        };
      });
  }, [fileList.length]);

  return (
    <Card className="hover:shadow-foreground transition-shadow hover:shadow">
      <CardContent className="mt-6 flex flex-col gap-6 md:flex-row">
        {/* Drag and Drop area combined with file selector and URL parser */}
        <div
          className="border-muted w-full rounded border-2 border-dashed"
          style={
            fileList.length > 0 ? { borderColor: "lightgreen" } : undefined
          }
          onDrop={(event) => {
            event.preventDefault();
            const files = [...event.dataTransfer.files];
            const fileList: FileUploadItem[] = files.map((item) => ({
              file: item,
              status: "pending",
              width: 0,
              height: 0,
            }));
            // uploading images
            setFileList((prev) => [...prev, ...fileList]);
          }}
          onDragOver={(event) => event.preventDefault()}
        >
          <div
            className="m-2 cursor-pointer transition-opacity hover:opacity-80"
            onClick={() => inputRef.current && inputRef.current.click()}
          >
            <CloudUpload
              className={cn(
                "mx-auto h-24 w-24 text-blue-400",
                status === "executing" && "animate-spin",
              )}
              // style={filesRef.current ? { color: "green" } : undefined}
            />
            <div
              className="text-lg text-blue-400"
              // style={filesRef.current ? { color: "green" } : undefined}
            >
              <p className="text-center">
                {tBlogImage("primitive_drag_and_drop")}
              </p>
              <p className="text-center">
                {tBlogImage("primitive_click_to_select")}
              </p>
              {/* URL parser. Loads image to the client for <img> check and, on success, passes it to the server action as a File */}
              <div className="flex items-center gap-2">
                {tBlogImage("primitive_or")}
                <Input
                  type="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder={tBlogImage("primitive_post_image_placeholder")}
                  className="w-full placeholder:text-blue-400"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(event) => {
                    event.stopPropagation();
                    if (event.code === "Enter") {
                      fetch(url)
                        .then((response) => response.blob())
                        .then((blob) => {
                          setFileList((prev) => [
                            ...prev,
                            {
                              file: new File([blob], createId(), {
                                type: `image/${getFileExtension(url)}`,
                              }),
                              status: "pending",
                              width: 0,
                              height: 0,
                            },
                          ]);
                          setUrl("");
                        })
                        .catch((error) => {
                          toast(
                            <SonnerErrorCard
                              title={tErrors(
                                "downloading_image_url_error_title",
                              )}
                              errors={`${tErrors("downloading_image_url_error_description")} ${error}`}
                            />,
                          );
                        });
                    }
                  }}
                />
              </div>

              <p className="text-center">
                {tBlogImage("primitive_file_size_limit")}{" "}
                {Math.floor(MAX_FILE_SIZE / 1000000)}MB
              </p>
            </div>
          </div>
          {/* Hidden input used to select files from user's PC */}
          <input
            disabled={status === "executing"}
            type="file"
            className="hidden"
            ref={inputRef}
            accept="image/*"
            multiple
            onChange={(event) => {
              if (!event.target.files) return;
              const files = [...event.target.files];
              const fileList: FileUploadItem[] = files.map((item) => ({
                file: item,
                status: "pending",
                width: 0,
                height: 0,
              }));
              // uploading images
              setFileList((prev) => [...prev, ...fileList]);
            }}
          />
        </div>

        {/* ImageSelector component. Indicates active image for the parent component of the
        ImagePrimitive as well as the list of images associated with the blog */}
        <ImageSelector
          imagesData={imagesData}
          unrestricted={unrestricted}
          allowDelete
        />
      </CardContent>
    </Card>
  );
}
