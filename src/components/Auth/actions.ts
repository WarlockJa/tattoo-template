"use server";

import { rateLimitByIp } from "@/lib/rateLimiting/limiters";
import { actionClient } from "@/lib/safeAction";
import { signIn } from "@auth/auth";
import { updateTag } from "next/cache";
import { z } from "zod";

const authSchema = z.object({
  provider: z.literal("google"),
  callbackUrl: z.string().optional(),
  email: z.string().email().optional(),
});

export const signUpAction = actionClient
  .inputSchema(authSchema)
  .action(async ({ parsedInput: { provider, callbackUrl, email } }) => {
    await rateLimitByIp({
      key: "signUp",
      limit: 3,
      window: 60000,
    });
    // revalidating blogs cache on user sing in state
    updateTag("signInState");
    await signIn(provider, { redirectTo: callbackUrl ?? "/", email });
  });
