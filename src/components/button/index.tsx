import NextLink from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cx } from "@/lib/cx";

import styles from "./styles.module.css";

type ButtonBaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonBaseProps> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof ButtonBaseProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

type AnchorProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string };
type NativeButtonProps = ComponentPropsWithoutRef<"button">;

/** Text button: primary (one per view), secondary, or ghost. Renders a link when `href` is set. */
export function Button({
  children,
  variant = "secondary",
  size = "md",
  iconLeft: IconLeft,
  iconRight: IconRight,
  fullWidth = false,
  disabled = false,
  className,
  ...rest
}: ButtonProps) {
  const classes = cx(
    styles.root,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  );

  const content = (
    <>
      {IconLeft ? <IconLeft className={styles.icon} /> : null}
      <span>{children}</span>
      {IconRight ? <IconRight className={styles.icon} /> : null}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as AnchorProps;

    // A disabled link has no href, so it cannot be followed or focused.
    if (disabled) {
      return (
        <a className={classes} aria-disabled="true" {...anchorProps}>
          {content}
        </a>
      );
    }

    return (
      <NextLink className={classes} href={href} {...anchorProps}>
        {content}
      </NextLink>
    );
  }

  const { type = "button", ...buttonProps } = rest as NativeButtonProps;

  return (
    <button className={classes} type={type} disabled={disabled} {...buttonProps}>
      {content}
    </button>
  );
}
