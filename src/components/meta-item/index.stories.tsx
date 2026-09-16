import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowBigUp, Clock, Feather, MessageSquare } from "lucide-react";

import { MetaItem } from "./index";

const meta = {
  title: "Components/Meta item",
  component: MetaItem,
  args: {
    icon: ArrowBigUp,
    children: "986 points",
    tone: "muted",
    wrap: false,
  },
  argTypes: {
    icon: { control: false },
    tone: { control: "inline-radio", options: ["muted", "strong", "accent"] },
  },
} satisfies Meta<typeof MetaItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Points: Story = {};

export const Author: Story = {
  args: { icon: Feather, prefix: "by", href: "/", children: "binarytale" },
};

export const Time: Story = {
  args: { icon: Clock, title: "12 Mar 2025, 09:41", children: "1 year ago" },
};

export const Comments: Story = {
  args: { icon: MessageSquare, children: "0 comments" },
};

export const Tones: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexWrap: "wrap", columnGap: "var(--space-4)" }}
    >
      <MetaItem icon={ArrowBigUp}>muted</MetaItem>
      <MetaItem icon={ArrowBigUp} tone="strong">
        strong
      </MetaItem>
      <MetaItem icon={ArrowBigUp} tone="accent">
        accent
      </MetaItem>
    </div>
  ),
};
