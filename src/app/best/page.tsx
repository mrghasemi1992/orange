import { SectionPlaceholder } from "@/components/section-placeholder";
import { getSectionMetadata } from "@/helpers/sections";

export const metadata = getSectionMetadata("best");

export default function BestPage() {
  return <SectionPlaceholder section="best" />;
}
