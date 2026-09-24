import NextLink from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { Tooltip } from "@/components/ui/tooltip";
import { cx } from "@/lib/cx";

import styles from "./styles.module.css";

type IconButtonBaseProps = {
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
  disabled?: boolean;
  className?: string;
};

type OmittedProps = keyof IconButtonBaseProps | "children" | "aria-label";

type IconButtonAsButton = IconButtonBaseProps &
  Omit<ComponentProps<"button">, OmittedProps> & { href?: undefined };

/** Renders a link instead of a button. */
type IconButtonAsLink = IconButtonBaseProps &
  Omit<ComponentProps<"a">, OmittedProps> & { href: string };

export type IconButtonProps = IconButtonAsButton | IconButtonAsLink;

type AnchorProps = Omit<ComponentProps<"a">, "href" | "children">;
type NativeButtonProps = Omit<ComponentProps<"button">, "children">;

/** Icon-only action. The label is required and doubles as the tooltip. */
export function IconButton({
  icon: Icon,
  label,
  variant = "ghost",
  size = "md",
  tooltip = true,
  tooltipSide = "bottom",
  shortcut,
  disabled = false,
  className,
  ...rest
}: IconButtonProps) {
  const classes = cx(styles.root, styles[variant], styles[size], className);
  const icon = <Icon className={styles.icon} />;

  let element;
  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as AnchorProps & { href: string };

    // A disabled link has no href, so it cannot be followed or focused.
    element = disabled ? (
      <a
        className={classes}
        aria-label={label}
        aria-disabled="true"
        {...anchorProps}
      >
        {icon}
      </a>
    ) : (
      <NextLink
        className={classes}
        href={href}
        aria-label={label}
        {...anchorProps}
      >
        {icon}
      </NextLink>
    );
  } else {
    const { type = "button", ...buttonProps } = rest as NativeButtonProps;

    element = (
      <button
        className={classes}
        type={type}
        aria-label={label}
        disabled={disabled}
        {...buttonProps}
      >
        {icon}
      </button>
    );
  }

  // Disabled controls get no pointer or focus events, so a tooltip could never open.
  if (!tooltip || disabled) return element;

  return (
    <Tooltip content={label} side={tooltipSide} shortcut={shortcut}>
      {element}
    </Tooltip>
  );
}
