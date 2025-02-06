import CustomDataImage from "@/components/UniversalComponents/CustomDataImage";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SelectImage } from "@cf/db/schemaImage";
import ImageSelector from "../../admin/_components/ImagePrimitive/_components/ImageSelector";
import { useTranslations } from "next-intl";

export default function ImageSelectorFormPart({
  onChange,
  value,
  imagesData,
}: {
  onChange: (...event: number[]) => void;
  value: number | undefined;
  imagesData: SelectImage[];
}) {
  const tAdminPage = useTranslations("AdminPage");
  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "relative aspect-video w-full",
          !value && "outline-accent outline",
        )}
      >
        <CustomDataImage
          dbImage={imagesData.find((img) => img.imageId === value)}
        />
        <div className="bg-background/80 absolute inset-0 flex items-center justify-center text-xl">
          {tAdminPage("click_to_select_image")}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[29rem]">
        <ImageSelector
          imagesData={imagesData}
          selectImage={(image) => onChange(image.imageId)}
          selectedImage={value}
          unrestricted
        />
      </PopoverContent>
    </Popover>
  );
}
