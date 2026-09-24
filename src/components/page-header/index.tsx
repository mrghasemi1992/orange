import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

import styles from "./styles.module.css";

type PageHeaderProps = {
  title: string;
  /** One plain line under the title. */
  description?: ReactNode;
  className?: string;
};

/** The page title and its one-line description, at the top of every page. */
export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <header className={cx(styles.root, className)}>
      <h1 className="type-page-title">{title}</h1>
      {description ? <p className={styles.description}>{description}</p> : null}
    </header>
  );
}
