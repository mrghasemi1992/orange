import type { Metadata } from "next";

import { SECTIONS } from "@/constants/sections";
import type { Section, SectionId } from "@/types/sections";

export function getSection(id: SectionId): Section {
  // Every SectionId has an entry, so the lookup always succeeds.
  return SECTIONS.find((section) => section.id === id)!;
}

/** Page title and description for a section route. */
export function getSectionMetadata(id: SectionId): Metadata {
  const { label, description } = getSection(id);
  return { title: label, description };
}
