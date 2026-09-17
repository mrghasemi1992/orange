import { THEME_ATTRIBUTE, THEME_STORAGE_KEY } from "./index";

/**
 * Runs in <head> before the first paint. Mirrors resolveTheme() without imports,
 * because it is inlined as a string.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute(${JSON.stringify(THEME_ATTRIBUTE)},t)}catch(e){}})()`;
