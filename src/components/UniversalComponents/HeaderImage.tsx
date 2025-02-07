import { ReactNode } from "react";
import CustomServerImage from "./CustomServerImage";
import { cn } from "@/lib/utils";

export default function HeaderImage({
  children,
  className,
  imageId,
  dbImageName,
  containerClassName,
  imgCover,
  imageClassName,
}: {
  children: ReactNode;
  className?: string;
  imageId?: number;
  dbImageName?: string;
  containerClassName?: string;
  imgCover?: boolean;
  imageClassName?: string;
}) {
  return (
    <div
      className={cn("text-background relative font-bold", containerClassName)}
    >
      <div className="absolute inset-0">
        {imgCover && <div className="absolute inset-0 bg-black/40"></div>}
        <CustomServerImage
          imageId={imageId}
          dbImageName={dbImageName}
          className={imageClassName}
        />
      </div>
      <div
        className={cn(
          "absolute inset-0 z-20 flex items-center justify-center",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
