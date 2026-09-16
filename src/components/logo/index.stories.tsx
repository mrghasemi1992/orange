import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Logo } from "./index";

const meta = {
  title: "Brand/Logo",
  component: Logo,
  args: { size: "md" },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md", "lg"] } },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-6)",
      }}
    >
      <Logo size="lg" />
      <Logo size="md" />
      <Logo size="sm" />
    </div>
  ),
};
