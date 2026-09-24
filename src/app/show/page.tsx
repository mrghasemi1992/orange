import { SectionPlaceholder } from "@/components/section-placeholder";
import { getSectionMetadata } from "@/helpers/sections";

export const metadata = getSectionMetadata("show");

export default function ShowPage() {
  return <SectionPlaceholder section="show" />;
}
