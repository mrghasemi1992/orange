import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SectionPlaceholder } from "@/components/section-placeholder";
import { Sidebar } from "@/components/sidebar";

import { MobileNav, MobileNavClose } from "./index";

/** Shown below 48rem. Try Tab, Escape, the scrim and the links with the drawer open. */
const meta = {
  title: "Components/Mobile nav",
  component: MobileNav,
  args: {
    drawer: <Sidebar variant="drawer" action={<MobileNavClose />} />,
    defaultOpen: false,
  },
  argTypes: { drawer: { control: false } },
  decorators: [
    (Story) => (
      <div style={{ width: "24rem", minHeight: "40rem" }}>
        <Story />
        <div style={{ padding: "var(--space-6) var(--gutter-mobile)" }}>
          <SectionPlaceholder section="show" />
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    nextjs: { navigation: { pathname: "/show" } },
  },
} satisfies Meta<typeof MobileNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const OpenLight: Story = {
  args: { defaultOpen: true },
  globals: { theme: "light" },
};

export const OpenDark: Story = {
  args: { defaultOpen: true },
  globals: { theme: "dark" },
  parameters: { nextjs: { navigation: { pathname: "/" } } },
};
