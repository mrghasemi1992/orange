import type { Decorator, Meta, StoryObj } from "@storybook/nextjs-vite";

import { ThemeToggle } from "./index";

// Room around the button so the tooltip is not clipped in the canvas.
const withTooltipSpace: Decorator = (Story) => (
  <div style={{ padding: "var(--space-12)" }}>
    <Story />
  </div>
);

/** Use the toolbar to see it in both themes. Clicking it switches the whole canvas. */
const meta = {
  title: "Components/Theme toggle",
  component: ThemeToggle,
  args: { tooltipSide: "right" },
  argTypes: {
    tooltipSide: { control: "inline-radio", options: ["top", "right"] },
  },
  decorators: [withTooltipSpace],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = { globals: { theme: "light" } };

export const Dark: Story = { globals: { theme: "dark" } };

export const TooltipOnTop: Story = { args: { tooltipSide: "top" } };
