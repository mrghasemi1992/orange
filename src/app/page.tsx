import {
  ArrowBigUpIcon,
  ClockIcon,
  FeatherIcon,
  KeyboardIcon,
  MessageSquareIcon,
  MoonIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { IconButton } from "@/components/ui/icon-button";
import { Kbd } from "@/components/ui/kbd";
import { Link } from "@/components/ui/link";
import { Logo } from "@/components/ui/logo";
import { MetaItem } from "@/components/ui/meta-item";

import styles from "./page.module.css";

/** Temporary home page for Phase 0b. Phase 1 replaces it with the app shell. */
export default function Home() {
  return (
    <main className={styles.main}>
      <Logo size="lg" />
      <p className={styles.tagline}>A reader for Hacker News. Coming soon.</p>

      <Divider spacing="loose" />

      <section className={styles.preview} aria-label="Design system preview">
        <div className={styles.row}>
          <Button variant="primary">Open story</Button>
          <Button>Load more</Button>
          <Button variant="ghost">Dismiss</Button>
          <IconButton
            icon={MoonIcon}
            label="Switch to dark theme"
            shortcut="T"
          />
          <IconButton
            icon={KeyboardIcon}
            label="Shortcuts"
            variant="secondary"
          />
        </div>

        <div className={styles.story}>
          <p className="type-story-list">
            <Badge size="sm" variant="accent" className={styles.badge}>
              Show HN
            </Badge>
            <Link variant="quiet" href="/">
              A calm, keyboard-driven reader for Hacker News
            </Link>{" "}
            <Badge variant="domain">orange.dev</Badge>
          </p>
          <div className={styles.meta}>
            <MetaItem icon={ArrowBigUpIcon}>1 point</MetaItem>
            <MetaItem icon={FeatherIcon} prefix="by" href="/">
              binarytale
            </MetaItem>
            <MetaItem icon={ClockIcon}>5 minutes ago</MetaItem>
            <MetaItem icon={MessageSquareIcon}>1 comment</MetaItem>
          </div>
        </div>

        <p className={styles.hint}>
          Press <Kbd>J</Kbd> and <Kbd>K</Kbd> to move between stories,{" "}
          <Kbd>?</Kbd> for all shortcuts.
        </p>
      </section>
    </main>
  );
}
