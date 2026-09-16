import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  ArrowLeft,
  ExternalLink,
  Eye,
  Keyboard,
  Moon,
  Search,
} from "lucide-react";

import { IconButton } from "./index";

const meta = {
  title: "Components/Icon button",
  component: IconButton,
  args: {
    icon: Moon,
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
  decorators: [
    (Story) => (
      <div style={{ paddingBlock: "var(--space-8)" }}>
        <Story />
      </div>
    ),
  ],
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
  args: { icon: Search, label: "Search", variant: "secondary" },
};

export const Accent: Story = {
  args: { icon: Eye, label: "Show", variant: "accent" },
};

export const Small: Story = {
  args: { icon: ArrowLeft, label: "Back", size: "sm" },
};

export const AsLink: Story = {
  args: { icon: ExternalLink, label: "Open original", href: "/" },
};

export const Disabled: Story = {
  render: () => (
    <div style={row}>
      <IconButton icon={ExternalLink} label="Open original" disabled />
      <IconButton icon={Search} label="Search" variant="secondary" disabled />
      <IconButton icon={Eye} label="Show" variant="accent" disabled />
    </div>
  ),
};

/** Tab through the row to see focus rings and tooltips. */
export const AllVariants: Story = {
  render: () => (
    <div style={row}>
      <IconButton icon={Moon} label="Switch to dark theme" shortcut="T" />
      <IconButton icon={Search} label="Search" variant="secondary" />
      <IconButton icon={Eye} label="Show" variant="accent" />
      <IconButton icon={Keyboard} label="Shortcuts" />
      <IconButton icon={ArrowLeft} label="Back" size="sm" />
      <IconButton icon={ExternalLink} label="Open original" disabled />
    </div>
  ),
};
