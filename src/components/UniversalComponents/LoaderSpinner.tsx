import { Loader2 } from "lucide-react";

export default function LoaderSpinner({ size = 60 }: { size?: number }) {
  return (
    <Loader2
      size={size}
      className="absolute animate-spin"
      style={{
        left: `calc(50% - ${size / 2}px)`,
        top: `calc(50% - ${size / 2}px)`,
      }}
    />
  );
}
