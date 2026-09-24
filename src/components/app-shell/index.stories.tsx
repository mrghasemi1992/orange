import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SectionPlaceholder } from "@/components/section-placeholder";

import { AppShell } from "./index";

/** The whole page frame. Press Tab once in the canvas to see the skip link. */
const meta = {
  title: "Components/App shell",
  component: AppShell,
  args: { children: <SectionPlaceholder section="top" /> },
  argTypes: { children: { control: false } },
  parameters: {
    layout: "fullscreen",
    nextjs: { navigation: { pathname: "/" } },
  },
} satisfies Meta<typeof AppShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};

export const Dark: Story = {
  globals: { theme: "dark" },
  args: { children: <SectionPlaceholder section="ask" /> },
  parameters: { nextjs: { navigation: { pathname: "/ask" } } },
};
