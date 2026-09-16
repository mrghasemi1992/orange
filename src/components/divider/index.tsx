import { cx } from "@/lib/cx";

import styles from "./styles.module.css";

type DividerProps = {
  orientation?: "horizontal" | "vertical";
  spacing?: "none" | "tight" | "default" | "loose";
  className?: string;
};

/** A 1px hairline. Orange separates with rules and space, not boxes. */
export function Divider({ orientation = "horizontal", spacing = "default", className }: DividerProps) {
  const classes = cx(styles.root, styles[orientation], styles[spacing], className);

  if (orientation === "vertical") {
    return <span className={classes} role="separator" aria-orientation="vertical" />;
  }
  return <hr className={classes} />;
}
