import type { Decorator, Preview } from "@storybook/nextjs-vite";

import { fontVariables } from "../src/styles/fonts";
import "../src/app/globals.css";

/** Apply the fonts and the toolbar theme to <html>, the same place the app puts them. */
const withAppShell: Decorator = (Story, context) => {
  const root = document.documentElement;
  root.classList.add(...fontVariables.split(" "));
  root.setAttribute(
    "data-theme",
    context.globals.theme === "dark" ? "dark" : "light",
  );
  return <Story />;
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Color theme",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [withAppShell],
  parameters: {
    layout: "padded",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
