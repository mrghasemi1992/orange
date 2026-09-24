import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { PageHeader } from "./index";

const meta = {
  title: "Components/Page header",
  component: PageHeader,
  args: {
    title: "Ask",
    description: "Questions from the Hacker News community.",
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TitleOnly: Story = {
  args: { description: undefined },
};
