import { cn } from "@/lib/utils";

export default function CustomHeader({
  text,
  fontSizeRem = 1,
  className,
  textClassName,
}: {
  text: string;
  fontSizeRem?: number;
  className?: string;
  textClassName?: string;
}) {
  return (
    <div className={className}>
      <div className={"relative font-bold"}>
        <div
          className={`absolute left-0 top-0 text-accent opacity-10`}
          style={{
            fontSize: `${fontSizeRem * 2}rem`,
            transform: `translate(-${fontSizeRem * 10}px, -${fontSizeRem * 16}px)`,
          }}
        >
          {text.slice(0, 1)}
        </div>
        <div
          className={cn("text-foreground", textClassName)}
          style={{ fontSize: `${fontSizeRem}rem` }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}
