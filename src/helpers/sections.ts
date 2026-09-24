import type { Metadata } from "next";

import { SECTIONS } from "@/constants/sections";
import { SITE_NAME } from "@/constants/site";
import type { Section, SectionId } from "@/types/sections";

export function getSection(id: SectionId): Section {
  // Every SectionId has an entry, so the lookup always succeeds.
  return SECTIONS.find((section) => section.id === id)!;
}

/** Page title and description for a section route. */
export function getSectionMetadata(id: SectionId): Metadata {
  const { label, description } = getSection(id);
  // The layout's title template skips "/", which shares the root segment, so write the full title.
  return { title: { absolute: `${label} | ${SITE_NAME}` }, description };
}
