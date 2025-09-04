// app/layout.tsx
import type React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { TranslationProvider } from "@/hooks/use-translation";
import { Toaster } from "sonner";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "Hassan Adan Hassan - Diplomatic Excellence",
  description:
    "Official website of Hassan Adan Hassan - Diplomatic and Consular Services",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ await cookies() in server component
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("language")?.value;
  const initialLang =
    langCookie === "fr" || langCookie === "en" ? langCookie : "en";

  return (
    <html
      lang={initialLang}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body suppressHydrationWarning>
        <TranslationProvider initialLanguage={initialLang}>
          {children}
          <Toaster richColors position="top-right" />
        </TranslationProvider>
      </body>
    </html>
  );
}
