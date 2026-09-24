import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewspaperIcon } from "lucide-react";

import { NavLink } from "./index";

const meta = {
  title: "Components/Nav link",
  component: NavLink,
  args: {
    href: "/new",
    icon: <NewspaperIcon />,
    children: "New",
  },
  argTypes: { icon: { control: false } },
  decorators: [
    (Story) => (
      <div style={{ width: "var(--sidebar-width)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { nextjs: { navigation: { pathname: "/" } } },
};

export const Current: Story = {
  parameters: { nextjs: { navigation: { pathname: "/new" } } },
};
