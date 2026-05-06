import type { MysteryAction } from "./MysteryButton.interface";
import { confettiAction } from "./actions/Confetti";
import { redirectAction } from "./actions/Redirect";
import { flipAction } from "./actions/Flip";
import { spotifyAction } from "./actions/Spotify";
import { darkModeAction } from "./actions/DarkMode";
import { cursorTrailAction } from "./actions/CursorTrail";

export const MYSTERY_TRIGGER_ID = "mystery-button-trigger";

export const COOLDOWN_MS = 2000;

export const EFFECT_STAGGER_MS = 800;

export const mysteryActions: MysteryAction[] = [
  confettiAction,
  redirectAction,
  flipAction,
  cursorTrailAction,
  spotifyAction,
  darkModeAction,
];
