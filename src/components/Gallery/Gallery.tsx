import { Button } from "@/components/ui/button";
import ModalImagesViewer from "./ModalImagesViewer";
import { SelectImage } from "@cf/db/schemaImage";
import CustomDataImage from "../UniversalComponents/CustomDataImage";

export default function Gallery({ images }: { images: SelectImage[] }) {
  return images.map((img, index) => (
    <div key={`${img}${index}`}>
      <ModalImagesViewer images={images} activeImageIndex={index}>
        <Button
          type="button"
          variant={"ghost"}
          className="h-full w-full cursor-pointer border-2 p-0 contrast-100 transition-all hover:scale-105 hover:shadow-xl hover:contrast-125"
        >
          <CustomDataImage dbImage={img} />
        </Button>
      </ModalImagesViewer>
    </div>
  ));
}
