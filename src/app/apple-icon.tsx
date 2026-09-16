import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** The app icon from the design (assets/app-icon.svg), rendered to PNG. Colors match the orange ramp tokens. */
export default function AppleIcon() {
  return new ImageResponse(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="180" height="180">
      <rect width="512" height="512" fill="#ff6b18" />
      <circle cx="242" cy="298" r="150" fill="#fff4ec" />
      <path d="M254 158c3-61 49-97 116-93 3 61-43 99-116 93z" fill="#ffd9bd" />
    </svg>,
    size,
  );
}
