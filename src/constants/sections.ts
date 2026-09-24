import {
  AwardIcon,
  BriefcaseBusinessIcon,
  CircleQuestionMarkIcon,
  EyeIcon,
  HouseIcon,
  NewspaperIcon,
} from "lucide-react";

import type { Section } from "@/types/sections";

/** The story lists, in sidebar order. Shared by the navigation and the section pages. */
export const SECTIONS = [
  {
    id: "top",
    label: "Top",
    href: "/",
    description: "The front page of Hacker News.",
    icon: HouseIcon,
  },
  {
    id: "new",
    label: "New",
    href: "/new",
    description: "The latest submissions in the Hacker News community.",
    icon: NewspaperIcon,
  },
  {
    id: "best",
    label: "Best",
    href: "/best",
    description: "The highest-voted recent stories.",
    icon: AwardIcon,
  },
  {
    id: "ask",
    label: "Ask",
    href: "/ask",
    description: "Questions from the Hacker News community.",
    icon: CircleQuestionMarkIcon,
  },
  {
    id: "show",
    label: "Show",
    href: "/show",
    description: "Things people made and shared with Hacker News.",
    icon: EyeIcon,
  },
  {
    id: "jobs",
    label: "Jobs",
    href: "/jobs",
    description: "Openings at Y Combinator companies.",
    icon: BriefcaseBusinessIcon,
  },
] as const satisfies readonly Section[];
