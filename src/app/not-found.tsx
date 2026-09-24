import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";

import { PageMessage } from "@/components/page-message";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <PageMessage
      title="Page not found"
      description="There's nothing at this address."
      action={
        <Button href="/" iconLeft={ArrowLeftIcon}>
          Back to Top
        </Button>
      }
    />
  );
}
