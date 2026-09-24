import { SectionPlaceholder } from "@/components/section-placeholder";
import { getSectionMetadata } from "@/helpers/sections";

export const metadata = getSectionMetadata("ask");

export default function AskPage() {
  return <SectionPlaceholder section="ask" />;
}
