import type { ComponentProps, ReactNode } from "react";

import { PageHeader } from "@/components/page-header";
import { cx } from "@/utils/cx";

import styles from "./styles.module.css";

type PageMessageProps = Omit<ComponentProps<"div">, "title"> & {
  title: string;
  description: string;
  /** One action, usually a Button. */
  action?: ReactNode;
};

/** A plain full-page message with one action, for error and not-found pages. Left-aligned like any page. */
export function PageMessage({
  title,
  description,
  action,
  className,
  ...rest
}: PageMessageProps) {
  return (
    <div className={cx(styles.root, className)} {...rest}>
      <PageHeader title={title} description={description} />
      {action ? <div className={styles.action}>{action}</div> : null}
    </div>
  );
}
