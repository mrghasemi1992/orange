export type Theme = "light" | "dark";
export type ThemePreference = Theme | "system";

export const THEME_STORAGE_KEY = "orange-theme";
export const THEME_ATTRIBUTE = "data-theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark";
}

/** The saved choice, or null when the user follows the OS setting. */
export function getStoredTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
}

export function getSystemTheme(): Theme {
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

/** The theme that should be shown right now. */
export function resolveTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

/** The theme currently applied to <html>. */
export function getTheme(): Theme {
  const value = document.documentElement.getAttribute(THEME_ATTRIBUTE);
  return isTheme(value) ? value : resolveTheme();
}

export function getThemePreference(): ThemePreference {
  return getStoredTheme() ?? "system";
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
}

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

/** Save the choice ("system" clears it) and apply the resulting theme. */
export function setTheme(preference: ThemePreference): void {
  try {
    if (preference === "system") {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      window.localStorage.setItem(THEME_STORAGE_KEY, preference);
    }
  } catch {
    // Storage can be unavailable (private mode, blocked site data). The theme still applies for this page.
  }
  applyTheme(preference === "system" ? getSystemTheme() : preference);
  notify();
}

/**
 * Keep <html> in sync with the OS setting (while nothing is saved) and with changes made in other tabs.
 * The listener runs after every theme change. Returns an unsubscribe function.
 * Shaped for useSyncExternalStore: `useSyncExternalStore(subscribeTheme, getTheme, () => "light")`.
 */
export function subscribeTheme(listener: () => void): () => void {
  listeners.add(listener);

  if (listeners.size === 1) {
    window.matchMedia(DARK_QUERY).addEventListener("change", handleExternalChange);
    window.addEventListener("storage", handleStorage);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.matchMedia(DARK_QUERY).removeEventListener("change", handleExternalChange);
      window.removeEventListener("storage", handleStorage);
    }
  };
}

function handleExternalChange() {
  applyTheme(resolveTheme());
  notify();
}

function handleStorage(event: StorageEvent) {
  if (event.key === null || event.key === THEME_STORAGE_KEY) handleExternalChange();
}
