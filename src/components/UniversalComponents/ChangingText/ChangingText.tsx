import ChangingTextClient from "./ChangingTextClient";

export default function ChangingText({
  textArray,
  className,
  durationMs,
  transitionPercent,
  center,
}: {
  textArray: string[];
  durationMs: number;
  transitionPercent?: number;
  className?: string;
  center?: boolean;
}) {
  {
    /* 
    duration = L * 0.8 * AnimDuration Example: L = 4, AnimDuration = 4000 => duration = 12800
    precent = 100 / (L*(1-Transition*2)) Example: L = 4, Transition = 0.1 => precent = 31.25%
    percentOffset = percent * (Transition * 2) Example: percent = 31.25, Transition = 0.1 => offsetStart = 0 + 6.25%, offsetFinish = 31.25 - 6.25 = 25%
    */
  }
  const transition = transitionPercent ? transitionPercent / 100 : 0.1;
  const duration = textArray.length * 0.8 * durationMs;
  const percent = 100 / (textArray.length * (1 - transition * 2));
  const percentOffset = percent * transition * 2;
  const styleString = `
      @keyframes fadeInOut {
        0%,
        ${percent}% {
          opacity: 0;
        }
        ${percentOffset}%,
        ${percent - percentOffset}% {
          opacity: 1;
        }
      }
      .fading-text {
        animation: fadeInOut ${duration}ms ease-in-out infinite;
      }
    `;

  const longestTextIndex = textArray.reduce(
    (maxIdx, cur, idx, arr) => (arr[maxIdx].length < cur.length ? idx : maxIdx),
    0,
  );
  return (
    <ChangingTextClient
      durationMs={durationMs}
      styleChild={<style>{styleString}</style>}
      textArray={textArray}
      className={className}
      longestTextIndex={longestTextIndex}
      center={center}
    />
  );
}
