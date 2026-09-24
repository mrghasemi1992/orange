import NextLink from "next/link";
import type { ReactNode } from "react";

import { NavLink } from "@/components/nav-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { SECTIONS } from "@/constants/sections";
import { cx } from "@/utils/cx";

import styles from "./styles.module.css";

type SidebarProps = {
  /** "drawer" is the same content inside the mobile drawer: raised surface, no hairline. */
  variant?: "sidebar" | "drawer";
  /** Rendered next to the logo, for the drawer's close button. */
  action?: ReactNode;
  className?: string;
};

/** Logo, the section links and the theme toggle. A Server Component; only the links and the toggle hydrate. */
export function Sidebar({
  variant = "sidebar",
  action,
  className,
}: SidebarProps) {
  return (
    <div className={cx(styles.root, styles[variant], className)}>
      <div className={styles.header}>
        <NextLink
          href="/"
          className={styles.home}
          aria-label="Orange, go to Top"
        >
          <Logo size="sm" />
        </NextLink>
        {action}
      </div>

      <nav aria-label="Sections" className={styles.nav}>
        <ul className={styles.list}>
          {SECTIONS.map(({ id, href, label, icon: Icon }) => (
            <li key={id}>
              <NavLink href={href} icon={<Icon />}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <ThemeToggle tooltipSide={variant === "drawer" ? "top" : "right"} />
      </div>
    </div>
  );
}
