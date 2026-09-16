import NextLink from "next/link";
import { ExternalLink } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cx } from "@/lib/cx";

import styles from "./styles.module.css";

type LinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  children: ReactNode;
  /** inline: links in body copy. user: orange usernames. quiet: story titles. */
  variant?: "inline" | "user" | "quiet";
  /** Opens in a new tab and shows the external-link icon. Internal links use next/link. */
  external?: boolean;
};

/** Text link. */
export function Link({
  href,
  children,
  variant = "inline",
  external = false,
  className,
  ...rest
}: LinkProps) {
  const classes = cx(styles.root, styles[variant], className);

  if (external) {
    return (
      <a className={classes} href={href} target="_blank" rel="noreferrer noopener" {...rest}>
        {children}
        <ExternalLink className={styles.externalIcon} />
      </a>
    );
  }

  return (
    <NextLink className={classes} href={href} {...rest}>
      {children}
    </NextLink>
  );
}
