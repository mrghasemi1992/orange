import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ColorTokens, OtherTokens, RealData, TypeScale } from "./index";

const meta = {
  title: "Design system/Foundations",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = { render: () => <ColorTokens /> };

export const Typography: Story = { render: () => <TypeScale /> };

export const SpacingRadiusShadow: Story = {
  name: "Spacing, radius, shadow",
  render: () => <OtherTokens />,
};

/** A long title that wraps, a long username, five-digit counts, and singular "1 point" / "1 comment". */
export const MessyData: Story = {
  name: "Real data",
  render: () => <RealData />,
};
