import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { LogoMark } from "./index";

const meta = {
  title: "Brand/Logo mark",
  component: LogoMark,
  args: { size: 48, title: "Orange" },
} satisfies Meta<typeof LogoMark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "var(--space-6)" }}>
      <LogoMark size={64} title="Orange" />
      <LogoMark size={48} />
      <LogoMark size={32} />
      <LogoMark size={24} />
      <LogoMark size={20} />
    </div>
  ),
};
