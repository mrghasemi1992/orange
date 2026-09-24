import type { Decorator, Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  ArrowLeftIcon,
  ExternalLinkIcon,
  EyeIcon,
  KeyboardIcon,
  MoonIcon,
  SearchIcon,
} from "lucide-react";

import { IconButton } from "./index";

// Room above and below so tooltips are not clipped in the canvas.
const withTooltipSpace: Decorator = (Story) => (
  <div style={{ paddingBlock: "var(--space-8)" }}>
    <Story />
  </div>
);

const meta = {
  title: "Design system/Icon button",
  component: IconButton,
  args: {
    icon: MoonIcon,
    label: "Switch to dark theme",
    variant: "ghost",
    size: "md",
    tooltip: true,
    tooltipSide: "bottom",
    disabled: false,
  },
  argTypes: {
    icon: { control: false },
    variant: {
      control: "inline-radio",
      options: ["ghost", "secondary", "accent"],
    },
    size: { control: "inline-radio", options: ["sm", "md"] },
    tooltipSide: {
      control: "inline-radio",
      options: ["top", "bottom", "left", "right"],
    },
  },
  decorators: [withTooltipSpace],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const row = {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-3)",
} as const;

export const Ghost: Story = {};

export const WithShortcut: Story = { args: { shortcut: "T" } };

export const Secondary: Story = {
  args: { icon: SearchIcon, label: "Search", variant: "secondary" },
};

export const Accent: Story = {
  args: { icon: EyeIcon, label: "Show", variant: "accent" },
};

export const Small: Story = {
  args: { icon: ArrowLeftIcon, label: "Back", size: "sm" },
};

export const AsLink: Story = {
  args: { icon: ExternalLinkIcon, label: "Open original", href: "/" },
};

export const Disabled: Story = {
  render: () => (
    <div style={row}>
      <IconButton icon={ExternalLinkIcon} label="Open original" disabled />
      <IconButton
        icon={SearchIcon}
        label="Search"
        variant="secondary"
        disabled
      />
      <IconButton icon={EyeIcon} label="Show" variant="accent" disabled />
    </div>
  ),
};

/** Tab through the row to see focus rings and tooltips. */
export const AllVariants: Story = {
  render: () => (
    <div style={row}>
      <IconButton icon={MoonIcon} label="Switch to dark theme" shortcut="T" />
      <IconButton icon={SearchIcon} label="Search" variant="secondary" />
      <IconButton icon={EyeIcon} label="Show" variant="accent" />
      <IconButton icon={KeyboardIcon} label="Shortcuts" />
      <IconButton icon={ArrowLeftIcon} label="Back" size="sm" />
      <IconButton icon={ExternalLinkIcon} label="Open original" disabled />
    </div>
  ),
};
