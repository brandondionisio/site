import type { MysteryAction } from "./MysteryButton.interface";
import { confettiAction } from "./actions/confetti";
import { redirectAction } from "./actions/redirect";
import { flipAction } from "./actions/flip";
import { spotifyAction } from "./actions/spotify";
import { darkModeAction } from "./actions/darkMode";

export const MYSTERY_TRIGGER_ID = "mystery-button-trigger";

export const COOLDOWN_MS = 2000;

export const EFFECT_STAGGER_MS = 800;

export const mysteryActions: MysteryAction[] = [
  confettiAction,
  redirectAction,
  flipAction,
  spotifyAction,
  darkModeAction,
];
