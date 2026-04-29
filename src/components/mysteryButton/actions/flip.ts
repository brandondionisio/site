import type { MysteryAction } from "../MysteryButton.interface";

let flipTimer: number | null = null;

function flipPageUpsideDown() {
  const root = document.documentElement;
  if (flipTimer) {
    clearTimeout(flipTimer);
    flipTimer = null;
  }
  root.style.transition = "transform";
  root.style.transformOrigin = "center center";
  root.style.transform = "rotate(180deg)";
  flipTimer = window.setTimeout(() => {
    root.style.transform = "";
    flipTimer = null;
  }, 10000);
}

export const flipAction: MysteryAction = {
  run: () => flipPageUpsideDown(),
  message: "Screen flip!",
};
