import { PageHeader } from "@/components/page-header";
import { getSection } from "@/helpers/sections";
import type { SectionId } from "@/types/sections";

import styles from "./styles.module.css";

type SectionPlaceholderProps = {
  section: SectionId;
};

/** Temporary section page body. Phase 2 replaces the note with the story list. */
export function SectionPlaceholder({ section }: SectionPlaceholderProps) {
  const { label, description } = getSection(section);

  return (
    <>
      <PageHeader title={label} description={description} />
      <p className={styles.note}>Stories arrive in Phase 2.</p>
    </>
  );
}
