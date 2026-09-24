import type { Metadata } from "next";

import { themeScript } from "@/lib/theme/script";
import { ThemeSync } from "@/lib/theme/theme-sync";
import { fontVariables } from "@/styles/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Orange",
  description: "A modern Hacker News reader",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The inline theme script sets data-theme before hydration, so React must accept the DOM value.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeSync />
        {children}
      </body>
    </html>
  );
}
