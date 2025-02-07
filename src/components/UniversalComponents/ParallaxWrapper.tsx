"use client";

import { cn } from "@/lib/utils";
import { useScroll, useTransform } from "motion/react";
import { ReactNode, useRef } from "react";
import { motion } from "motion/react";

export default function ParallaxWrapper({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const wrapperRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    // EXPLANATION
    // end start
    // END(bottom) of the element meets the START(top) of the viewport
    // start end
    // START(top) of the element meets the END(bottom) of the viewport
    offset: ["end start", "start end"],
  });

  // Full height range: -50% - 0%
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-40%", "-10%"]);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative h-[75vh] max-h-[810px] overflow-hidden",
        className,
      )}
    >
      <motion.div
        className="h-[150vh] blur-xs"
        style={{
          y: backgroundY,
          backgroundImage: "url(/parallaxbg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
