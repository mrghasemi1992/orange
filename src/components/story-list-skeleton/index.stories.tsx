import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { StoryListSkeleton } from "./index";

const meta = {
  title: "Components/Story list skeleton",
  component: StoryListSkeleton,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "var(--content-max)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StoryListSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = { globals: { theme: "light" } };

export const Dark: Story = { globals: { theme: "dark" } };
