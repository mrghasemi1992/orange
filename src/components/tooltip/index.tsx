"use client";

import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type { ReactElement } from "react";

import styles from "./styles.module.css";

type TooltipProps = {
  /** One short sentence-case line. For icon buttons it matches the aria-label. */
  content: string;
  /** The trigger. Must be a single element that accepts a ref and props (a button or link). */
  children: ReactElement;
  /** Keyboard shortcut shown as a key chip inside the tooltip. */
  shortcut?: string;
  side?: "top" | "bottom" | "left" | "right";
  /** Hover delay in ms. Keyboard focus opens it right away. */
  delay?: number;
  /** Force the open state, for example in stories. */
  open?: boolean;
};

/** Distance between trigger and tooltip in px, from the design. */
const SIDE_OFFSET = 6;

/** Label shown on hover and keyboard focus. Closes with Escape. Never for information the user needs. */
export function Tooltip({
  content,
  children,
  shortcut,
  side = "top",
  delay = 180,
  open,
}: TooltipProps) {
  return (
    <BaseTooltip.Root open={open}>
      <BaseTooltip.Trigger delay={delay} render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner side={side} sideOffset={SIDE_OFFSET} className={styles.positioner}>
          <BaseTooltip.Popup className={styles.popup}>
            <span>{content}</span>
            {shortcut ? <kbd className={styles.shortcut}>{shortcut}</kbd> : null}
          </BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
