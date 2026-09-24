import type { Decorator, Meta, StoryObj } from "@storybook/nextjs-vite";
import { XIcon } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";

import { Sidebar } from "./index";

const withFrame: Decorator = (Story, { args }) => (
  <div
    style={{
      width:
        args.variant === "drawer"
          ? "var(--drawer-width)"
          : "var(--sidebar-width)",
      height: "40rem",
    }}
  >
    <Story />
  </div>
);

/** Use the toolbar for the dark theme. The current link follows the mocked pathname. */
const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  args: { variant: "sidebar" },
  argTypes: {
    variant: { control: "inline-radio", options: ["sidebar", "drawer"] },
    action: { control: false },
  },
  decorators: [withFrame],
  parameters: {
    layout: "fullscreen",
    nextjs: { navigation: { pathname: "/" } },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {};

export const AskDark: Story = {
  globals: { theme: "dark" },
  parameters: { nextjs: { navigation: { pathname: "/ask" } } },
};

/** On pages outside the sections (not found), no link is current. */
export const NoneCurrent: Story = {
  parameters: { nextjs: { navigation: { pathname: "/missing" } } },
};

export const Drawer: Story = {
  args: {
    variant: "drawer",
    action: (
      <IconButton icon={XIcon} label="Close navigation" tooltip={false} />
    ),
  },
  parameters: { nextjs: { navigation: { pathname: "/show" } } },
};
