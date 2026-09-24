import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChartColumnIcon } from "lucide-react";

import { Badge } from "./index";

const meta = {
  title: "Design system/Badge",
  component: Badge,
  args: { children: "Ask HN", variant: "neutral", size: "md" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["neutral", "accent", "outline", "domain"],
    },
    size: { control: "inline-radio", options: ["sm", "md"] },
    icon: { control: false },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

const row = {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-3)",
} as const;

export const Neutral: Story = {};

export const Accent: Story = {
  args: { variant: "accent", children: "Show HN" },
};

export const Outline: Story = { args: { variant: "outline", children: "Job" } };

export const WithIcon: Story = {
  args: { icon: ChartColumnIcon, children: "Poll" },
};

export const Domain: Story = {
  args: { variant: "domain", href: "/", children: "wsj.com" },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
      }}
    >
      {(["md", "sm"] as const).map((size) => (
        <div key={size} style={row}>
          <Badge size={size}>Ask HN</Badge>
          <Badge size={size} variant="accent">
            Show HN
          </Badge>
          <Badge size={size} variant="outline">
            Job
          </Badge>
          <Badge size={size} icon={ChartColumnIcon}>
            Poll
          </Badge>
          <Badge size={size} variant="domain" href="/">
            wsj.com
          </Badge>
        </div>
      ))}
    </div>
  ),
};
