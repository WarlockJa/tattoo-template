"use client";

import { useAction } from "next-safe-action/hooks";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import SonnerErrorCard from "@/components/UniversalComponents/sonners/SonnerErrorCard";
import { signUpAction } from "./actions";
import { Loader2, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface ISignInClientComponentProps {
  callbackUrl?: string;
  size?: number;
  className?: string;
}

export default function SignInClientComponent({
  callbackUrl,
  size = 40,
  className,
}: ISignInClientComponentProps) {
  const tErrors = useTranslations("Errors");

  const { execute, status } = useAction(signUpAction, {
    onError({ error }) {
      if (error.serverError === "RateLimitError") {
        toast(tErrors("rate_limit_title"), {
          description: tErrors("rate_limit_description"),
        });

        return;
      }

      toast(
        <SonnerErrorCard
          title={tErrors("general_error_title")}
          errors={JSON.stringify(error)}
        />,
      );
    },
  });

  return (
    <button
      type="submit"
      onClick={() => {
        execute({ provider: "google", callbackUrl });
      }}
      disabled={status === "executing"}
    >
      {status === "executing" ? (
        <Loader2 size={size} className={cn("animate-spin", className)} />
      ) : (
        <LogIn size={size} className={className} />
      )}
    </button>
  );
}
