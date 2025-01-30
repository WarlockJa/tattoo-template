"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { useInView } from "motion/react";

interface SlidingSectionProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  className?: string;
  classNameLeftPanel?: string;
  classNameRightPanel?: string;
  vertical?: boolean;
  reverse?: boolean;
}

export default function SlideinSection({
  leftContent,
  rightContent,
  className,
  classNameLeftPanel,
  classNameRightPanel,
  vertical,
  reverse,
}: SlidingSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className={cn(
        "mx-auto flex w-full flex-col overflow-hidden lg:flex-row",
        className,
        reverse && "flex-col-reverse",
        vertical && "sm:flex-row lg:flex-col",
      )}
    >
      <div
        className={cn(
          `w-full transition-transform duration-1000 ease-out lg:w-1/2`,
          isInView ? "translate-x-0" : "-translate-x-full",
          classNameLeftPanel,
          vertical && "sm:w-1/2 lg:w-full",
        )}
      >
        {leftContent}
      </div>
      <div
        className={cn(
          `w-full transition-transform duration-1000 ease-out lg:w-1/2`,
          isInView ? "translate-x-0" : "translate-x-full",
          classNameRightPanel,
          vertical && "sm:w-1/2 lg:w-full",
        )}
      >
        {rightContent}
      </div>
    </section>
  );
}
