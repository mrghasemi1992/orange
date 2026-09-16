import { LogoMark } from "@/components/logo-mark";

import styles from "./styles.module.css";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

/** The lockup: mark plus the "Orange" wordmark set in IBM Plex Mono. */
export function Logo({ size = "md", className }: LogoProps) {
  return (
    <span
      className={[styles.root, styles[size], className]
        .filter(Boolean)
        .join(" ")}
    >
      <LogoMark className={styles.mark} />
      <span className={styles.wordmark}>Orange</span>
    </span>
  );
}
