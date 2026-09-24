import { cx } from "@/utils/cx";

import styles from "./styles.module.css";

type SkeletonProps = {
  variant?: "line" | "title" | "block";
  /** CSS width. Defaults to full width, or varied widths when `lines` > 1. */
  width?: string;
  /** CSS height override. */
  height?: string;
  /** Render a stack of this many lines. */
  lines?: number;
  className?: string;
};

const STACK_WIDTHS = ["100%", "92%", "68%", "84%", "74%"];

/**
 * Loading placeholder. Hidden from assistive tech; mark the loading region with aria-busy="true".
 */
export function Skeleton({
  variant = "line",
  width,
  height,
  lines = 1,
  className,
}: SkeletonProps) {
  const classes = cx(styles.root, styles[variant], className);

  if (lines > 1) {
    return (
      <span className={styles.stack} aria-hidden="true">
        {Array.from({ length: lines }, (_, i) => (
          <span
            key={i}
            className={classes}
            style={{
              width: width ?? STACK_WIDTHS[i % STACK_WIDTHS.length],
              height,
            }}
          />
        ))}
      </span>
    );
  }

  return (
    <span className={classes} style={{ width, height }} aria-hidden="true" />
  );
}
