import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orange",
  description: "A modern Hacker News reader",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
