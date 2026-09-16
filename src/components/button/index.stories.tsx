import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowLeft, ExternalLink, Search } from "lucide-react";

import { Button } from "./index";

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "Load more", variant: "secondary", size: "md", disabled: false },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "ghost"] },
    size: { control: "inline-radio", options: ["sm", "md"] },
    iconLeft: { control: false },
    iconRight: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const row = { display: "flex", alignItems: "center", gap: "var(--space-3)", flexWrap: "wrap" } as const;
const stack = { display: "flex", flexDirection: "column", gap: "var(--space-4)" } as const;

export const Playground: Story = {};

export const Primary: Story = { args: { variant: "primary", children: "Open story" } };

export const Secondary: Story = { args: { variant: "secondary", children: "Load more" } };

export const Ghost: Story = { args: { variant: "ghost", children: "Dismiss" } };

export const WithIcon: Story = {
  args: { size: "sm", iconLeft: ArrowLeft, children: "Back" },
};

export const AsLink: Story = {
  args: { href: "/", variant: "primary", iconRight: ExternalLink, children: "Visit site" },
};

export const Disabled: Story = {
  render: () => (
    <div style={row}>
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button disabled>Disabled</Button>
      <Button variant="ghost" disabled>
        Disabled
      </Button>
      <Button href="/" disabled>
        Disabled link
      </Button>
    </div>
  ),
};

/** Tab through the row to see the focus ring. Hover and press are live. */
export const AllVariants: Story = {
  render: () => (
    <div style={stack}>
      {(["primary", "secondary", "ghost"] as const).map((variant) => (
        <div key={variant} style={row}>
          <Button variant={variant}>Open story</Button>
          <Button variant={variant} size="sm" iconLeft={Search}>
            Search
          </Button>
          <Button variant={variant} disabled>
            Disabled
          </Button>
        </div>
      ))}
    </div>
  ),
};
