"use client";

import { RotateCcwIcon } from "lucide-react";
import { useEffect } from "react";

import { PageMessage } from "@/components/page-message";
import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  /** Re-fetches and re-renders the segment. Unlike reset(), it also retries the data. */
  retry: () => void;
};

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") console.error(error);
  }, [error]);

  return (
    <PageMessage
      role="alert"
      title="Something went wrong"
      description="This page couldn't load."
      action={
        <Button variant="primary" iconLeft={RotateCcwIcon} onClick={retry}>
          Try again
        </Button>
      }
    />
  );
}
