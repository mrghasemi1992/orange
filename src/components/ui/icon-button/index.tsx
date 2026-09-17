import NextLink from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Tooltip } from "@/components/ui/tooltip";
import { cx } from "@/lib/cx";

import styles from "./styles.module.css";

type IconButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "children" | "aria-label"
> & {
  icon: LucideIcon;
  /** Required accessible name. Also used as the tooltip text, so both always match. */
  label: string;
  variant?: "ghost" | "secondary" | "accent";
  size?: "sm" | "md";
  /** Show the label as a tooltip on hover and focus. */
  tooltip?: boolean;
  tooltipSide?: "top" | "bottom" | "left" | "right";
  /** Keyboard shortcut shown inside the tooltip. */
  shortcut?: string;
  /** Renders a link instead of a button. */
  href?: string;
};

/** Icon-only action. The label is required and doubles as the tooltip. */
export function IconButton({
  icon: Icon,
  label,
  variant = "ghost",
  size = "md",
  tooltip = true,
  tooltipSide = "bottom",
  shortcut,
  href,
  disabled = false,
  className,
  type = "button",
  ...rest
}: IconButtonProps) {
  const classes = cx(styles.root, styles[variant], styles[size], className);
  const icon = <Icon className={styles.icon} />;

  let control;
  if (href !== undefined && !disabled) {
    control = (
      <NextLink className={classes} href={href} aria-label={label}>
        {icon}
      </NextLink>
    );
  } else if (href !== undefined) {
    control = (
      <a className={classes} aria-label={label} aria-disabled="true">
        {icon}
      </a>
    );
  } else {
    control = (
      <button
        className={classes}
        type={type}
        aria-label={label}
        disabled={disabled}
        {...rest}
      >
        {icon}
      </button>
    );
  }

  // Disabled controls get no pointer or focus events, so a tooltip could never open.
  if (!tooltip || disabled) return control;

  return (
    <Tooltip content={label} side={tooltipSide} shortcut={shortcut}>
      {control}
    </Tooltip>
  );
}
