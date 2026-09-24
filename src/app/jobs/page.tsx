import { SectionPlaceholder } from "@/components/section-placeholder";
import { getSectionMetadata } from "@/helpers/sections";

export const metadata = getSectionMetadata("jobs");

export default function JobsPage() {
  return <SectionPlaceholder section="jobs" />;
}
