import { SectionPlaceholder } from "@/components/section-placeholder";
import { getSectionMetadata } from "@/helpers/sections";

export const metadata = getSectionMetadata("new");

export default function NewPage() {
  return <SectionPlaceholder section="new" />;
}
