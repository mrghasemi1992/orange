import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Divider } from "./index";

const meta = {
  title: "Design system/Divider",
  component: Divider,
  args: { orientation: "horizontal", spacing: "default" },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
    spacing: {
      control: "inline-radio",
      options: ["none", "tight", "default", "loose"],
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

const text = {
  margin: 0,
  color: "var(--text-secondary)",
  fontSize: "var(--type-meta-size)",
};

export const Horizontal: Story = {
  render: (args) => (
    <div>
      <p style={text}>Above the rule</p>
      <Divider {...args} />
      <p style={text}>Below the rule</p>
    </div>
  ),
};

export const Spacings: Story = {
  render: () => (
    <div>
      {(["none", "tight", "default", "loose"] as const).map((spacing) => (
        <div key={spacing}>
          <p style={text}>{spacing}</p>
          <Divider spacing={spacing} />
        </div>
      ))}
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={text}>New</span>
      <Divider {...args} />
      <span style={text}>Ask</span>
      <Divider {...args} />
      <span style={text}>Show</span>
    </div>
  ),
};
