import { IBM_Plex_Mono, Noto_Sans } from "next/font/google";

export const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-noto-sans",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-plex-mono",
});

/** Class names that define the font CSS variables. Put them on <html>. */
export const fontVariables = `${notoSans.variable} ${plexMono.variable}`;
