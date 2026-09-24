import NextLink from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cx } from "@/utils/cx";

import styles from "./styles.module.css";

type BadgeProps = {
  children: ReactNode;
  /** neutral / accent / outline for story kinds; domain for a source site, shown as "(wsj.com)". */
  variant?: "neutral" | "accent" | "outline" | "domain";
  size?: "sm" | "md";
  icon?: LucideIcon;
  href?: string;
  className?: string;
};

/** Small label: story kind ("Ask HN", "Show HN", "Job", "Poll") or a source domain. */
export function Badge({
  children,
  variant = "neutral",
  size = "md",
  icon: Icon,
  href,
  className,
}: BadgeProps) {
  const classes = cx(
    styles.root,
    styles[variant],
    styles[size],
    href && styles.link,
    className,
  );
  const content = (
    <>
      {Icon ? <Icon className={styles.icon} /> : null}
      <span className={styles.label}>
        {variant === "domain" ? <>({children})</> : children}
      </span>
    </>
  );

  if (href) {
    return (
      <NextLink className={classes} href={href}>
        {content}
      </NextLink>
    );
  }
  return <span className={classes}>{content}</span>;
}
