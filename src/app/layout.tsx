import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Kings,
  Playfair_Display,
  Raleway,
} from "next/font/google";
import "./globals.css";
import { getLocale, getMessages } from "next-intl/server";
import { AnimatePresence } from "motion/react";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import NextTransitionBar from "next-transition-bar";
import { Toaster } from "@/components/ui/sonner";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";
import {
  brandMetadataDescritpion,
  brandMetadataImage,
  brandMetadataSiteName,
  brandMetadataTwitterAccount,
  brandMetadataUrl,
  brandName,
} from "@/appConfig";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin-ext"],
  preload: true,
  weight: ["400"],
});

const raleway = Raleway({
  subsets: ["latin-ext"],
  variable: "--font-raleway",
  weight: ["400", "600", "700", "800", "900"],
});

const kings = Kings({
  subsets: ["latin-ext"],
  variable: "--font-kings",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: brandName,
  description: brandMetadataDescritpion,
  openGraph: {
    title: brandName,
    description: brandMetadataDescritpion,
    url: brandMetadataUrl,
    siteName: brandMetadataSiteName,
    images: [brandMetadataImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: brandMetadataTwitterAccount,
    creator: brandMetadataTwitterAccount,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${kings.variable} ${geistMono.variable} ${playfair.variable} ${raleway.variable} font-playfair relative mx-auto w-full max-w-[1920px] antialiased`}
      >
        <div
          className="absolute inset-0 -z-10 opacity-10"
          style={{
            backgroundImage: "url(/bg-ocean.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <AnimatePresence>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextTransitionBar
                color="hsl(var(--accent))"
                showSpinner={false}
              />
              <Toaster />
              <NavBar />
              <WhatsappButton
                className="bg-foreground/80 fixed bottom-2 left-2 z-10 rounded-2xl p-1.5 md:bottom-10 md:left-10"
                iconClassName="w-12 h-12"
              />
              {children}

              <Footer />
            </ThemeProvider>
          </NextIntlClientProvider>
        </AnimatePresence>
      </body>
      <Script
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "64354413f4e042eb9a0b2596e0a1f264"}'
      />
    </html>
  );
}
