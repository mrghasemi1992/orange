"use client";

import {
  ArrowBigUp,
  ChartColumn,
  Clock,
  ExternalLink,
  Feather,
  FileText,
  MessageSquare,
} from "lucide-react";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

import { Badge } from "@/components/design-system/badge";
import { Link } from "@/components/design-system/link";
import { MetaItem } from "@/components/design-system/meta-item";
import type { LucideIcon } from "lucide-react";

import styles from "./styles.module.css";

/*
 * Storybook-only documentation of the design system. Not used by the app.
 */

const RAMP = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];
const GRAYS = [
  "0",
  "25",
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];
const INKS = ["900", "850", "800", "750", "700", "600", "500"];

const SEMANTIC: Array<[token: string, use: string]> = [
  ["--bg", "page"],
  ["--bg-subtle", "app shell"],
  ["--surface", "cards, menus"],
  ["--surface-raised", "popovers"],
  ["--surface-sunken", "kbd, inputs"],
  ["--surface-hover", "row hover"],
  ["--surface-active", "row press"],
  ["--border", "hairlines"],
  ["--border-strong", "hover border"],
  ["--text", "primary text"],
  ["--text-secondary", "labels"],
  ["--text-muted", "meta"],
  ["--text-on-accent", "ink on orange"],
  ["--accent", "fills, mark"],
  ["--accent-hover", "fill hover"],
  ["--accent-active", "fill press"],
  ["--accent-text", "orange text"],
  ["--accent-text-hover", "orange text hover"],
  ["--accent-subtle", "selected nav"],
  ["--accent-subtle-hover", "selected nav hover"],
  ["--accent-border", "tinted border"],
  ["--focus-ring", "keyboard ring"],
  ["--link", "links, usernames"],
  ["--link-hover", "link hover"],
  ["--skeleton", "loading"],
  ["--tooltip-bg", "tooltip"],
];

/** Reads the resolved value of a custom property from the element's position in the tree. */
function useTokenValue(token: string) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState("");

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const read = () =>
      setValue(getComputedStyle(element).getPropertyValue(token).trim());
    read();
    // Re-read when the Storybook theme toolbar changes data-theme on <html>.
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, [token]);

  return { ref, value };
}

function Swatch({ token }: { token: string }) {
  const { ref, value } = useTokenValue(token);
  return (
    <span ref={ref} className={styles.swatch}>
      <span
        className={styles.swatchColor}
        style={{ background: `var(${token})` }}
      />
      <span className={styles.swatchName}>{token.replace(/^--/, "")}</span>
      <span className={styles.swatchValue}>{value}</span>
    </span>
  );
}

function TokenRow({ token, use }: { token: string; use: string }) {
  const { ref, value } = useTokenValue(token);
  return (
    <span ref={ref} className={styles.tokenRow}>
      <span
        className={styles.tokenDot}
        style={{ background: `var(${token})` }}
      />
      <code className={styles.tokenName}>{token}</code>
      <span className={styles.tokenValue}>{value}</span>
      <span className={styles.tokenUse}>{use}</span>
    </span>
  );
}

function Section({
  title,
  lede,
  children,
}: {
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{title}</h2>
      <p className={styles.lede}>{lede}</p>
      {children}
    </section>
  );
}

function ThemePanes({ children }: { children: ReactNode }) {
  return (
    <div className={styles.panes}>
      <div className={styles.pane} data-theme="light">
        <span className={styles.paneTag}>light</span>
        {children}
      </div>
      <div className={styles.pane} data-theme="dark">
        <span className={styles.paneTag}>dark</span>
        {children}
      </div>
    </div>
  );
}

export function ColorTokens() {
  return (
    <>
      <Section
        title="Palette"
        lede="One orange, kept scarce. Warm neutrals for paper, blue-cast inks for the dark theme."
      >
        <h3 className={styles.subheading}>Orange</h3>
        <div className={styles.swatches}>
          {RAMP.map((step) => (
            <Swatch key={step} token={`--orange-${step}`} />
          ))}
        </div>
        <h3 className={styles.subheading}>Gray</h3>
        <div className={styles.swatches}>
          {GRAYS.map((step) => (
            <Swatch key={step} token={`--gray-${step}`} />
          ))}
        </div>
        <h3 className={styles.subheading}>Ink</h3>
        <div className={styles.swatches}>
          {INKS.map((step) => (
            <Swatch key={step} token={`--ink-${step}`} />
          ))}
        </div>
      </Section>
      <Section
        title="Semantic tokens"
        lede="Components use only these. Orange text steps down to orange-700 in light so it clears AA; fills carry near-black ink."
      >
        <ThemePanes>
          <div className={styles.tokenList}>
            {SEMANTIC.map(([token, use]) => (
              <TokenRow key={token} token={token} use={use} />
            ))}
          </div>
        </ThemePanes>
      </Section>
    </>
  );
}

const TYPE_SCALE: Array<[className: string, spec: string, sample: string]> = [
  ["type-page-title", "28 / 34 · 600", "New"],
  ["type-story-title", "27 / 34 · 600", "Poll: where do you live?"],
  [
    "type-story-list",
    "15 / 22 · 500",
    "Show HN: I rebuilt the Hacker News front page as a calm, keyboard-driven reader that works offline",
  ],
  [
    "type-body",
    "16.5 / 28 · 400",
    "I read a tweet that referred to HN as “Silicon Valley”, which struck me as odd because I suspect most users, like me, are located elsewhere. So: where do you live?",
  ],
  ["type-label", "14 / 20 · 500", "Load more"],
  ["type-meta", "13 / 18 · 400 · tabular", "12,480 points · 986 · 1"],
  ["type-small", "12 / 16 · 500", "Ask HN"],
  ["type-wordmark", "IBM Plex Mono · 600", "Orange"],
];

export function TypeScale() {
  return (
    <Section
      title="Type"
      lede="Noto Sans for everything readable. IBM Plex Mono only for the wordmark and keyboard keys. Reading text is capped at 68ch."
    >
      <div>
        {TYPE_SCALE.map(([className, spec, sample]) => (
          <div key={className} className={styles.typeRow}>
            <span className={styles.typeSpec}>
              <code>.{className}</code>
              <br />
              {spec}
            </span>
            <span className={className}>{sample}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

const SPACES = ["1", "2", "3", "4", "5", "6", "8", "10", "12", "16", "20"];
const RADII = ["xs", "sm", "md", "lg", "xl", "full"];
const SHADOWS = ["xs", "sm", "md", "lg"];

export function OtherTokens() {
  return (
    <>
      <Section title="Spacing" lede="2px base with a 4px rhythm above 8.">
        <div className={styles.scale}>
          {SPACES.map((step) => (
            <span key={step} className={styles.scaleItem}>
              <span
                className={styles.scaleBar}
                style={{ width: `var(--space-${step})` }}
              />
              <code className={styles.caption}>space-{step}</code>
            </span>
          ))}
        </div>
      </Section>
      <Section
        title="Radius"
        lede="Chosen by part size. Never one radius on everything."
      >
        <div className={styles.boxes}>
          {RADII.map((step) => (
            <span key={step} className={styles.boxItem}>
              <span
                className={styles.radiusBox}
                style={{ borderRadius: `var(--radius-${step})` }}
              />
              <code className={styles.caption}>radius-{step}</code>
            </span>
          ))}
        </div>
      </Section>
      <Section
        title="Shadow"
        lede="Almost invisible by design. Dark shadows add a faint light ring."
      >
        <ThemePanes>
          <div className={styles.boxes}>
            {SHADOWS.map((step) => (
              <span key={step} className={styles.boxItem}>
                <span
                  className={styles.shadowBox}
                  style={{ boxShadow: `var(--shadow-${step})` }}
                />
                <code className={styles.caption}>shadow-{step}</code>
              </span>
            ))}
          </div>
        </ThemePanes>
      </Section>
    </>
  );
}

type ExampleStory = {
  icon: LucideIcon;
  kind?: string;
  title: string;
  domain?: string;
  points: string;
  user: string;
  time: string;
  comments: string;
};

const MESSY_STORIES: ExampleStory[] = [
  {
    icon: FileText,
    kind: "Show HN",
    title:
      "I spent eighteen months rebuilding the Hacker News front page as a calm, keyboard-driven reader that works offline, renders comment threads without collapsing them, and never loads a single tracking script",
    points: "12,480 points",
    user: "a_very_long_username_that_keeps_going_42",
    time: "1 year ago",
    comments: "1,532 comments",
  },
  {
    icon: ExternalLink,
    title: "The exodus of China’s wealthy to Japan",
    domain: "wsj.com",
    points: "1 point",
    user: "jseliger",
    time: "5 minutes ago",
    comments: "1 comment",
  },
  {
    icon: ChartColumn,
    kind: "Poll",
    title: "Poll: where do you live?",
    points: "986 points",
    user: "binarytale",
    time: "1 year ago",
    comments: "0 comments",
  },
];

/** The base components against messy real-world HN data. Not the Phase 2 story row. */
export function RealData() {
  return (
    <ThemePanes>
      <div className={styles.rows}>
        {MESSY_STORIES.map((story) => (
          <div key={story.title} className={styles.row}>
            <story.icon className={styles.rowIcon} />
            <div className={styles.rowBody}>
              <p className={`type-story-list ${styles.rowTitle}`}>
                {story.kind ? (
                  <Badge size="sm" className={styles.rowBadge}>
                    {story.kind}
                  </Badge>
                ) : null}
                <Link variant="quiet" href="/">
                  {story.title}
                </Link>{" "}
                {story.domain ? (
                  <Badge variant="domain" href="/">
                    {story.domain}
                  </Badge>
                ) : null}
              </p>
              <div className={styles.meta}>
                <MetaItem icon={ArrowBigUp}>{story.points}</MetaItem>
                <MetaItem icon={Feather} prefix="by" href="/" wrap>
                  {story.user}
                </MetaItem>
                <MetaItem icon={Clock} title="12 Mar 2025, 09:41">
                  {story.time}
                </MetaItem>
                <MetaItem icon={MessageSquare}>{story.comments}</MetaItem>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ThemePanes>
  );
}
