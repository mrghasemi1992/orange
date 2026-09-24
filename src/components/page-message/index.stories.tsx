import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowLeftIcon, RotateCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import { PageMessage } from "./index";

const meta = {
  title: "Components/Page message",
  component: PageMessage,
  argTypes: { action: { control: false } },
} satisfies Meta<typeof PageMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

/** error.tsx */
export const ErrorPage: Story = {
  args: {
    role: "alert",
    title: "Something went wrong",
    description: "This page couldn't load.",
    action: (
      <Button variant="primary" iconLeft={RotateCcwIcon}>
        Try again
      </Button>
    ),
  },
};

/** not-found.tsx */
export const NotFound: Story = {
  globals: { theme: "dark" },
  args: {
    title: "Page not found",
    description: "There's nothing at this address.",
    action: (
      <Button href="/" iconLeft={ArrowLeftIcon}>
        Back to Top
      </Button>
    ),
  },
};
