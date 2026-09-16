import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Skeleton } from "./index";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  args: { variant: "line", lines: 1 },
  argTypes: {
    variant: { control: "inline-radio", options: ["line", "title", "block"] },
  },
  decorators: [
    (Story) => (
      <div aria-busy="true" style={{ maxWidth: "var(--content-max)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = {};

export const Title: Story = { args: { variant: "title", width: "60%" } };

export const Block: Story = { args: { variant: "block" } };

export const MultipleLines: Story = { args: { lines: 3 } };

/** A loading story row: title plus meta line. */
export const StoryRow: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
      }}
    >
      <Skeleton variant="title" width="72%" />
      <Skeleton width="40%" />
    </div>
  ),
};
