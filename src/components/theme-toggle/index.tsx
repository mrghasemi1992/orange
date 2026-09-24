"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useSyncExternalStore } from "react";

import { IconButton } from "@/components/ui/icon-button";
import type { Theme } from "@/types/theme";
import { cx } from "@/utils/cx";
import {
  getThemeFromDocument,
  setThemePreference,
  subscribeToThemeChanges,
} from "@/utils/theme";

import styles from "./styles.module.css";

type ThemeToggleProps = {
  tooltipSide?: "top" | "right";
  className?: string;
};

/** The server can't know the theme, so it renders a neutral label. */
function getServerTheme(): Theme | null {
  return null;
}

function getLabel(theme: Theme | null): string {
  if (theme === null) return "Toggle theme";
  return theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
}

/**
 * Switches between light and dark and saves the choice. Both icons are rendered and CSS on
 * [data-theme] shows the one for the theme you switch to, so the icon never flashes.
 * The label comes from the theme store once hydrated.
 */
export function ThemeToggle({
  tooltipSide = "right",
  className,
}: ThemeToggleProps) {
  const theme = useSyncExternalStore(
    subscribeToThemeChanges,
    getThemeFromDocument,
    getServerTheme,
  );

  const icon = (
    <span className={styles.icons} aria-hidden="true">
      <MoonIcon className={cx(styles.icon, styles.moon)} />
      <SunIcon className={cx(styles.icon, styles.sun)} />
    </span>
  );

  return (
    <IconButton
      icon={icon}
      label={getLabel(theme)}
      shortcut="T"
      tooltipSide={tooltipSide}
      className={className}
      onClick={() =>
        setThemePreference(getThemeFromDocument() === "dark" ? "light" : "dark")
      }
    />
  );
}
