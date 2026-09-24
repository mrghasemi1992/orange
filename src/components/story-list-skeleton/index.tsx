import { Skeleton } from "@/components/ui/skeleton";

import styles from "./styles.module.css";

/** Title and meta widths per row, so the placeholder list looks like real titles. */
const ROWS = [
  ["78%", "46%"],
  ["62%", "40%"],
  ["88%", "52%"],
  ["55%", "38%"],
  ["72%", "48%"],
  ["66%", "42%"],
  ["84%", "50%"],
  ["58%", "36%"],
] as const;

/** Placeholder for a page header and a story list. The skeletons are hidden; screen readers hear "Loading stories". */
export function StoryListSkeleton() {
  return (
    <div role="status" aria-busy="true">
      <span className="visually-hidden">Loading stories</span>

      <div className={styles.header}>
        <Skeleton
          variant="title"
          width="var(--skeleton-page-title-width)"
          height="var(--skeleton-page-title-height)"
        />
        <Skeleton
          variant="line"
          width="min(var(--skeleton-page-description-width), 100%)"
        />
      </div>

      <div className={styles.list}>
        {ROWS.map(([titleWidth, metaWidth], index) => (
          <div key={index} className={styles.row}>
            <Skeleton
              variant="block"
              width="var(--skeleton-row-icon)"
              height="var(--skeleton-row-icon)"
              className={styles.icon}
            />
            <div className={styles.text}>
              <Skeleton
                variant="title"
                width={titleWidth}
                height="var(--skeleton-row-title-height)"
              />
              <Skeleton variant="line" width={metaWidth} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
