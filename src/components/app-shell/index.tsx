import type { ReactNode } from "react";

import { MobileNav, MobileNavClose } from "@/components/mobile-nav";
import { Sidebar } from "@/components/sidebar";

import styles from "./styles.module.css";

type AppShellProps = {
  children: ReactNode;
};

/** Skip link, sidebar (top bar and drawer on mobile) and the main content column. Every page, including loading and error states, renders inside it. */
export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to content
      </a>
      <div className={styles.root}>
        <MobileNav
          className={styles.topbar}
          drawer={<Sidebar variant="drawer" action={<MobileNavClose />} />}
        />
        <Sidebar className={styles.sidebar} />
        {/* tabIndex lets the skip link move focus here, not only scroll. */}
        <main id="main" tabIndex={-1} className={styles.main}>
          <div className={styles.content}>{children}</div>
        </main>
      </div>
    </>
  );
}
