import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SectionPlaceholder } from "./index";

const meta = {
  title: "Components/Section placeholder",
  component: SectionPlaceholder,
  args: { section: "top" },
  argTypes: {
    section: {
      control: "inline-radio",
      options: ["top", "new", "best", "ask", "show", "jobs"],
    },
  },
} satisfies Meta<typeof SectionPlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {};

export const Show: Story = { args: { section: "show" } };
