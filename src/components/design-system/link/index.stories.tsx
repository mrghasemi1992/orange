import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Link } from "./index";

const meta = {
  title: "Design system/Link",
  component: Link,
  args: {
    href: "/",
    children: "original discussion",
    variant: "inline",
    external: false,
  },
  argTypes: {
    variant: { control: "inline-radio", options: ["inline", "user", "quiet"] },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

const text = {
  margin: 0,
  maxWidth: "var(--measure-reading)",
  fontSize: "var(--type-body-size)",
  lineHeight: "var(--type-body-line)",
} as const;

export const Inline: Story = {
  render: (args) => (
    <p style={text}>
      See the <Link {...args} /> for more context.
    </p>
  ),
};

export const User: Story = {
  args: { variant: "user", children: "binarytale" },
};

export const Quiet: Story = {
  args: {
    variant: "quiet",
    children: "The exodus of China’s wealthy to Japan",
  },
  render: (args) => (
    <p className="type-story-list">
      <Link {...args} />
    </p>
  ),
};

export const External: Story = {
  args: { href: "https://www.wsj.com", external: true, children: "wsj.com" },
};

/** Tab through to see the focus outline on each variant. */
export const AllVariants: Story = {
  render: () => (
    <p style={text}>
      Inline <Link href="/">original discussion</Link>, username{" "}
      <Link variant="user" href="/">
        binarytale
      </Link>
      , quiet{" "}
      <Link variant="quiet" href="/">
        story title
      </Link>
      , external{" "}
      <Link href="https://www.wsj.com" external>
        wsj.com
      </Link>
    </p>
  ),
};
