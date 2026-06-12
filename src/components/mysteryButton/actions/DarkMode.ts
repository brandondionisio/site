import type { MysteryAction } from "../MysteryButton.interface";

const THEME_KEY = "theme";

function toggleDarkMode() {
  const root = document.documentElement;
  root.classList.toggle("dark");
  try {
    localStorage.setItem(
      THEME_KEY,
      root.classList.contains("dark") ? "dark" : "light",
    );
  } catch {
    /* ignore */
  }
}

export const darkModeAction: MysteryAction = {
  run: () => toggleDarkMode(),
  message: () =>
    document.documentElement.classList.contains("dark")
      ? "Dark mode disabled"
      : "Dark mode enabled",
};
