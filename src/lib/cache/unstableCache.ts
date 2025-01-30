import { unstable_cache } from "next/cache";
import { cache as reactCache } from "react";

type TCallback = (...args: Record<string, unknown>[]) => Promise<unknown>;

// this function consolidates caching from React and NextJS and uses both of them in order to optimise requests performance
export default function unstableCache<T extends TCallback>(
  cb: T,
  keyParts: string[],
  options: {
    revalidate?: number | false;
    tags?: string[];
  } = {},
) {
  // wrapping callback in React and NextJS cache functions
  return unstable_cache(reactCache(cb), keyParts, options);
}
