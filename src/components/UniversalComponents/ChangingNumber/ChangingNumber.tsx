"use client";
import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const INTERVAL = 10;

export default function ChangingNumber({
  numberToGetTo,
  className,
  text,
  timeMs = 1000,
}: {
  numberToGetTo: number;
  className?: string;
  text?: string;
  timeMs?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [number, setNumber] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    // NOTE
    // const numberOfIterations = timeMs / INTERVAL;
    // const incrementStep = numberToGetTo / numberOfIterations;
    // NOTE

    const interval = setInterval(() => {
      // animating year counter
      if (number < numberToGetTo) {
        // setNumber(number + 1);
        setNumber(number + numberToGetTo / (timeMs / INTERVAL));
      } else if (number > numberToGetTo) {
        setNumber(numberToGetTo);
      }
    }, INTERVAL);

    return () => clearInterval(interval);
  }, [isInView, number, numberToGetTo, timeMs]);
  return (
    <div ref={ref} className={className}>
      {Math.floor(number)}
      {text}
    </div>
  );
}
