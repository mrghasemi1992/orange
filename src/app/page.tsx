import {
  ArrowBigUp,
  Clock,
  Feather,
  Keyboard,
  MessageSquare,
  Moon,
} from "lucide-react";

import { Badge } from "@/components/design-system/badge";
import { Button } from "@/components/design-system/button";
import { Divider } from "@/components/design-system/divider";
import { IconButton } from "@/components/design-system/icon-button";
import { Kbd } from "@/components/design-system/kbd";
import { Link } from "@/components/design-system/link";
import { Logo } from "@/components/design-system/logo";
import { MetaItem } from "@/components/design-system/meta-item";

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
          <IconButton icon={Moon} label="Switch to dark theme" shortcut="T" />
          <IconButton icon={Keyboard} label="Shortcuts" variant="secondary" />
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
            <MetaItem icon={ArrowBigUp}>1 point</MetaItem>
            <MetaItem icon={Feather} prefix="by" href="/">
              binarytale
            </MetaItem>
            <MetaItem icon={Clock}>5 minutes ago</MetaItem>
            <MetaItem icon={MessageSquare}>1 comment</MetaItem>
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
