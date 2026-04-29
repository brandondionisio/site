import type { MysteryAction, MysteryEffectContext } from "../MysteryButton.interface";

function launchConfettiBurst(
  anchorEl: HTMLElement | null,
  rectSnapshot: DOMRect | null | undefined,
) {
  const rect =
    rectSnapshot && rectSnapshot.width > 0 && rectSnapshot.height > 0
      ? rectSnapshot
      : anchorEl?.getBoundingClientRect?.();
  if (!rect || rect.width <= 0 || rect.height <= 0) return;
  const originX = rect.left + rect.width * 0.35;
  const originY = rect.top + rect.height * 0.75;
  const colors = ["#db2777", "#7c3aed", "#14b8a6", "#f59e0b", "#3b82f6"];
  const pieces = 26;
  const zConfetti = "2147483646";

  for (let i = 0; i < pieces; i++) {
    const piece = document.createElement("span");
    const driftX = -34 + (Math.random() - 0.5) * 120;
    const driftY = 42 + (Math.random() - 0.5) * 110;
    const rot = -240 + Math.random() * 480;
    const size = 5 + Math.random() * 7;
    piece.style.position = "fixed";
    piece.style.left = `${originX}px`;
    piece.style.top = `${originY}px`;
    piece.style.width = `${size}px`;
    piece.style.height = `${size * 1.4}px`;
    piece.style.borderRadius = "2px";
    piece.style.pointerEvents = "none";
    piece.style.zIndex = zConfetti;
    piece.style.background = colors[i % colors.length];
    piece.style.transform = "translate(-50%, -50%)";
    piece.style.opacity = "1";
    piece.style.transition =
      "transform 850ms cubic-bezier(.2,.8,.2,1), opacity 850ms ease-out";
    document.body.appendChild(piece);
    void piece.offsetWidth;

    requestAnimationFrame(() => {
      piece.style.transform = `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px)) rotate(${rot}deg)`;
      piece.style.opacity = "0";
    });

    window.setTimeout(() => piece.remove(), 900);
  }
}

export const confettiAction: MysteryAction = {
  run: (btn, ctx: MysteryEffectContext) =>
    launchConfettiBurst(btn, ctx.confettiRect),
  message: "Confetti 🎉",
};
