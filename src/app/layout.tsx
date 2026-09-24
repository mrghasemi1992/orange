import type { Metadata } from "next";

import { AppShell } from "@/components/app-shell";
import { ThemeSync } from "@/components/theme-sync";
import { THEME_SCRIPT } from "@/constants/theme";
import { fontVariables } from "@/styles/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Orange", template: "%s | Orange" },
  description: "A modern Hacker News reader",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The inline theme script sets data-theme before hydration, so React must accept the DOM value.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <ThemeSync />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
