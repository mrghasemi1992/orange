"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

import { cx } from "@/utils/cx";

import styles from "./styles.module.css";

type NavLinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  href: string;
  /** A rendered icon. Server Components can't pass a component function to a client component. */
  icon: ReactNode;
};

/** A sidebar link. The only client part of the sidebar: it reads the path to mark itself current. */
export function NavLink({
  href,
  icon,
  children,
  className,
  ...rest
}: NavLinkProps) {
  const isCurrent = usePathname() === href;

  return (
    <NextLink
      href={href}
      className={cx(styles.root, className)}
      aria-current={isCurrent ? "page" : undefined}
      {...rest}
    >
      {icon}
      <span>{children}</span>
    </NextLink>
  );
}
