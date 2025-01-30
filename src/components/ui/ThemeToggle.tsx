"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

// const themes = ["dark", "light", "system"] as const;
// type Themes = (typeof themes)[number];
type Themes = "dark" | "light" | "system";

export function ThemeToggle({
  menu,
  className,
}: {
  menu?: boolean;
  className?: string;
}) {
  const { setTheme, theme } = useTheme();
  const t = useTranslations("ThemeToggle");

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className={cn(
        "flex items-center justify-between gap-2",
        menu && "w-full",
      )}
    >
      <div className={cn("relative", className)}>
        <Sun
          size={40}
          className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
          size={40}
          className="absolute top-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span className="sr-only">Toggle theme</span>
      </div>
      {menu && (
        <div>
          {t("theme")}: {theme && t(theme as Themes)}
        </div>
      )}
    </button>
  );
}
