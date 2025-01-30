"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { ReactNode, useRef } from "react";

type SideUnion = "left" | "right" | "top" | "bottom" | "none";

export default function AnimatedComponent({
  children,
  delayS = 0,
  className,
  side = "bottom",
  duration = 0.4,
  rootInView,
  once = false,
}: {
  children: ReactNode;
  delayS?: number;
  className?: string;
  side?: SideUnion;
  duration?: number;
  rootInView?: boolean;
  once?: boolean;
}) {
  const ref = useRef(null);
  // const isInView = useInView(ref, { once: true, margin: "0px 0px -30px 0px" });
  const isInView = useInView(ref, { once });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...getPosition(side) }}
      animate={
        rootInView === undefined
          ? isInView
            ? { opacity: 1, y: 0, x: 0 }
            : { opacity: 0, ...getPosition(side) }
          : rootInView
            ? { opacity: 1, y: 0, x: 0 }
            : { opacity: 0, ...getPosition(side) }
      }
      transition={{ duration, delay: delayS }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const getPosition = (side: SideUnion) => {
  switch (side) {
    case "bottom":
      return { y: 50, x: 0 };
    case "top":
      return { y: -50, x: 0 };
    case "left":
      return { y: 0, x: -50 };
    case "right":
      return { y: 0, x: 50 };
    case "none":
      return { y: 0, x: 0 };

    default:
      return { y: 50, x: 0 };
  }
};
