"use client";

import { motion } from "motion/react";
import { useInView } from "motion/react";
import { ReactNode, useRef } from "react";

export default function AnimatedText({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  // const isInView = useInView(ref, { once: true, margin: "0px 0px -30px 0px" });
  const isInView = useInView(ref);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
