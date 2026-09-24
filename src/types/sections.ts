import type { LucideIcon } from "lucide-react";

export type SectionId = "top" | "new" | "best" | "ask" | "show" | "jobs";

export type Section = {
  id: SectionId;
  label: string;
  href: string;
  /** One plain line under the page title. */
  description: string;
  icon: LucideIcon;
};
