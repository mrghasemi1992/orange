import type { ComponentProps } from "react";

import { cx } from "@/utils/cx";

import styles from "./styles.module.css";

type KbdProps = ComponentProps<"kbd"> & {
  size?: "sm" | "md";
};

/** A single keyboard key, for example J or ?. */
export function Kbd({ size = "md", className, ...rest }: KbdProps) {
  return <kbd className={cx(styles.root, styles[size], className)} {...rest} />;
}
