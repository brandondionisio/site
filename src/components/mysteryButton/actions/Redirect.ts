import type { MysteryAction } from "../MysteryButton.interface";

const RANDOM_REDIRECTS = [
  "/blog/try-my-cryptic/",
  "/blog/project-hail-mary/",
  "/blog/starting-something-new/",
  "/blog/phonetics/",
  "/photos/",
];

function randomRedirect() {
  const target =
    RANDOM_REDIRECTS[Math.floor(Math.random() * RANDOM_REDIRECTS.length)];
  window.location.assign(target);
}

export const redirectAction: MysteryAction = {
  run: () => {
    window.setTimeout(() => randomRedirect(), 200);
  },
  message: "Check out this page",
};
