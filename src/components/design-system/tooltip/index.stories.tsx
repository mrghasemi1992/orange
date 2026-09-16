import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Sun } from "lucide-react";

import { Button } from "@/components/design-system/button";
import { IconButton } from "@/components/design-system/icon-button";

import { Tooltip } from "./index";

const meta = {
  title: "Design system/Tooltip",
  component: Tooltip,
  args: {
    content: "Open the original article",
    side: "top",
    delay: 180,
    children: <Button>Hover or focus me</Button>,
  },
  argTypes: {
    side: {
      control: "inline-radio",
      options: ["top", "bottom", "left", "right"],
    },
    children: { control: false },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "var(--space-12)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithShortcut: Story = {
  args: { content: "Switch to dark theme", shortcut: "T" },
};

/** Forced open to show the visuals. */
export const Open: Story = {
  args: {
    content: "Switch to dark theme",
    shortcut: "T",
    side: "right",
    open: true,
    children: (
      <IconButton
        icon={Sun}
        label="Switch to dark theme"
        variant="secondary"
        tooltip={false}
      />
    ),
  },
};

export const Sides: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--space-4)" }}>
      {(["top", "bottom", "left", "right"] as const).map((side) => (
        <Tooltip key={side} content={`Tooltip on ${side}`} side={side}>
          <Button size="sm">{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
