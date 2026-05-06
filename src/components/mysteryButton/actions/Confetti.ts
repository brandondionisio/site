import confetti from "canvas-confetti";
import type { MysteryAction, MysteryEffectContext } from "../MysteryButton.interface";

const COLORS = ["#db2777", "#7c3aed", "#14b8a6", "#f59e0b", "#3b82f6"];

function launchConfettiBurst(
  anchorEl: HTMLElement | null,
  rectSnapshot: DOMRect | null | undefined,
) {
  const rect =
    rectSnapshot && rectSnapshot.width > 0 && rectSnapshot.height > 0
      ? rectSnapshot
      : anchorEl?.getBoundingClientRect?.();
  if (!rect || rect.width <= 0 || rect.height <= 0) return;

  const w = window.innerWidth;
  const h = window.innerHeight;
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const targetX = w * 0.02;
  const targetY = h * 0.98;
  const vx = targetX - cx;
  const vyDown = targetY - cy;
  const angleDeg = (Math.atan2(-vyDown, vx) * 180) / Math.PI;

  const burst = () =>
    confetti({
      particleCount: 130,
      spread: 62,
      startVelocity: 48,
      angle: angleDeg,
      origin: { x: cx / w, y: cy / h },
      colors: COLORS,
      disableForReducedMotion: true,
    });

  void burst();
  window.setTimeout(() => {
    void confetti({
      particleCount: 70,
      spread: 80,
      startVelocity: 38,
      angle: angleDeg,
      origin: { x: cx / w, y: cy / h },
      colors: COLORS,
      scalar: 0.9,
      disableForReducedMotion: true,
    });
  }, 140);
}

export const confettiAction: MysteryAction = {
  run: (btn, ctx: MysteryEffectContext) =>
    launchConfettiBurst(btn, ctx.confettiRect),
  message: "Confetti 🎉",
};
