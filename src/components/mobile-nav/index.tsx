"use client";

import { Dialog } from "@base-ui/react/dialog";
import { MenuIcon, XIcon } from "lucide-react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";

import { IconButton } from "@/components/ui/icon-button";
import { Logo } from "@/components/ui/logo";
import { NAV_DESKTOP_QUERY } from "@/constants/media";
import { cx } from "@/utils/cx";

import styles from "./styles.module.css";

type MobileNavProps = {
  /** The drawer content: the sidebar with <MobileNavClose /> as its action. */
  drawer: ReactNode;
  /** Start with the drawer open, for stories. */
  defaultOpen?: boolean;
  className?: string;
};

/** The close button's ref, so the drawer can focus it on open. */
const CloseButtonContext =
  createContext<RefObject<HTMLButtonElement | null> | null>(null);

/**
 * The top bar below the --nav-mobile breakpoint: a menu button and the logo. The menu button opens
 * the sidebar in a drawer (Base UI Dialog), which traps focus, closes on Escape, the scrim, the
 * close button, a link click and a route change, and returns focus to the menu button.
 */
export function MobileNav({
  drawer,
  defaultOpen = false,
  className,
}: MobileNavProps) {
  const [open, setOpen] = useState(defaultOpen);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on route change, for example browser back while the drawer is open.
  const pathname = usePathname();
  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setOpen(false);
  }

  // The drawer only exists on small screens. Close it if the window grows past the breakpoint.
  useEffect(() => {
    const query = window.matchMedia(NAV_DESKTOP_QUERY);
    const closeOnDesktop = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", closeOnDesktop);
    return () => query.removeEventListener("change", closeOnDesktop);
  }, []);

  // A click on any link closes the drawer, including the link to the current page.
  const closeOnLinkClick = (event: MouseEvent<HTMLElement>) => {
    if (event.target instanceof Element && event.target.closest("a[href]"))
      setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <header className={cx(styles.topbar, className)}>
        <Dialog.Trigger
          render={
            <IconButton
              icon={MenuIcon}
              label="Open navigation"
              tooltip={false}
            />
          }
        />
        <NextLink
          href="/"
          className={styles.home}
          aria-label="Orange, go to Top"
        >
          <Logo size="sm" />
        </NextLink>
      </header>

      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Popup
          className={styles.drawer}
          aria-label="Navigation"
          initialFocus={closeButtonRef}
          onClick={closeOnLinkClick}
        >
          <CloseButtonContext value={closeButtonRef}>
            {drawer}
          </CloseButtonContext>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/** The drawer's close button. Render it inside the drawer content, next to the logo. */
export function MobileNavClose() {
  const ref = useContext(CloseButtonContext);

  return (
    <Dialog.Close
      ref={ref}
      render={
        <IconButton icon={XIcon} label="Close navigation" tooltip={false} />
      }
    />
  );
}
