import { SectionPlaceholder } from "@/components/section-placeholder";
import { getSectionMetadata } from "@/helpers/sections";

export const metadata = getSectionMetadata("top");

export default function TopPage() {
  return <SectionPlaceholder section="top" />;
}
