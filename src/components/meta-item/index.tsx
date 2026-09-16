import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Link } from "@/components/link";
import { cx } from "@/lib/cx";

import styles from "./styles.module.css";

type MetaItemProps = Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  icon?: LucideIcon;
  children: ReactNode;
  /** Words before the value that are not part of the link, for example "by". */
  prefix?: string;
  /** Turns the value into a username link. */
  href?: string;
  tone?: "muted" | "strong" | "accent";
  /** Let long values (such as usernames) wrap instead of overflowing. */
  wrap?: boolean;
};

/** One icon + text fact: "986 points", "by binarytale", "1 year ago", "0 comments". */
export function MetaItem({
  icon: Icon,
  children,
  prefix,
  href,
  tone = "muted",
  wrap = false,
  className,
  ...rest
}: MetaItemProps) {
  return (
    <span className={cx(styles.root, styles[tone], wrap && styles.wrap, className)} {...rest}>
      {Icon ? <Icon className={styles.icon} /> : null}
      <span className={styles.value}>
        {prefix ? `${prefix} ` : null}
        {href ? (
          <Link variant="user" href={href}>
            {children}
          </Link>
        ) : (
          children
        )}
      </span>
    </span>
  );
}
