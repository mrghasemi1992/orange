import { cx } from "@/utils/cx";

import styles from "./styles.module.css";

type LogoMarkProps = {
  /** Rendered width and height in px. Use 20 or larger; the favicon has its own 16px drawing. */
  size?: number;
  /** Accessible name. Leave empty when the mark sits next to the "Orange" wordmark. */
  title?: string;
  className?: string;
};

/** The Orange mark: a solid orange disc with a deeper leaf. Never recolor it. */
export function LogoMark({ size = 32, title, className }: LogoMarkProps) {
  return (
    <svg
      className={cx(styles.root, className)}
      viewBox="0 0 32 32"
      width={size}
      height={size}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <circle className={styles.fruit} cx="15.5" cy="19" r="11.5" />
      <path
        className={styles.leaf}
        d="M16.4 8.2C16.6 3.5 20.1 0.7 25.3 1c0.2 4.7-3.3 7.6-8.9 7.2z"
      />
    </svg>
  );
}
