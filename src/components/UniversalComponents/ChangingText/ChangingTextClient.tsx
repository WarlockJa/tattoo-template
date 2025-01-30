"use client";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function ChangingTextClient({
  styleChild,
  textArray,
  durationMs,
  className,
  longestTextIndex,
  center,
}: {
  styleChild: ReactNode;
  textArray: string[];
  durationMs: number;
  className?: string;
  longestTextIndex?: number;
  center?: boolean;
}) {
  return (
    <div className="relative">
      {styleChild}
      {textArray.map((item, index) => (
        <p
          key={index}
          className={cn(
            "fading-text leading-0 opacity-0",
            className,
            index !== longestTextIndex && "absolute inset-0",
            center && "text-center",
          )}
          style={{
            animationDelay: `${durationMs * 0.8 * index}ms`,
          }}
        >
          {item}
        </p>
      ))}
    </div>
  );
}
