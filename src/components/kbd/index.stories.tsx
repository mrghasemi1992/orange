import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Kbd } from "./index";

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  args: { children: "J", size: "md" },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md"] } },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = { args: { size: "sm", children: "?" } };

export const InText: Story = {
  render: () => (
    <p style={{ margin: 0, fontSize: "var(--type-meta-size)", color: "var(--text-secondary)" }}>
      Press <Kbd>J</Kbd> and <Kbd>K</Kbd> to move between stories, <Kbd>?</Kbd> for all shortcuts.
    </p>
  ),
};
