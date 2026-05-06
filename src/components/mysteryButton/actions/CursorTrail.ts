import type { MysteryAction } from "../MysteryButton.interface";

const TRAIL_MS = 15_000;
const MIN_DIST_SQ = 16;
const MAX_POINTS = 6000;

let trailCleanup: (() => void) | null = null;

function syncCanvasSize(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) {
  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawSmoothLine(
  ctx: CanvasRenderingContext2D,
  pts: { x: number; y: number }[],
) {
  if (pts.length < 2) return;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(219, 39, 119, 0.9)";
  ctx.shadowColor = "rgba(244, 114, 182, 0.5)";
  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);

  if (pts.length === 2) {
    ctx.lineTo(pts[1].x, pts[1].y);
  } else {
    for (let i = 1; i < pts.length - 2; i++) {
      const xc = (pts[i].x + pts[i + 1].x) / 2;
      const yc = (pts[i].y + pts[i + 1].y) / 2;
      ctx.quadraticCurveTo(pts[i].x, pts[i].y, xc, yc);
    }
    const j = pts.length - 2;
    ctx.quadraticCurveTo(pts[j].x, pts[j].y, pts[j + 1].x, pts[j + 1].y);
  }
  ctx.stroke();
  ctx.shadowBlur = 0;
}

function startPinkCursorTrail() {
  if (trailCleanup) trailCleanup();

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText =
    "position:fixed;inset:0;pointer-events:none;z-index:2147483645";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return;
  }

  syncCanvasSize(canvas, ctx);

  const points: { x: number; y: number }[] = [];
  let lastX = -99999;
  let lastY = -99999;

  const redraw = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawSmoothLine(ctx, points);
  };

  const onResize = () => {
    syncCanvasSize(canvas, ctx);
    redraw();
  };
  window.addEventListener("resize", onResize);

  const onMove = (e: PointerEvent) => {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    if (dx * dx + dy * dy < MIN_DIST_SQ) return;
    lastX = e.clientX;
    lastY = e.clientY;
    points.push({ x: e.clientX, y: e.clientY });
    if (points.length > MAX_POINTS) {
      points.splice(0, points.length - MAX_POINTS);
    }
    redraw();
  };

  window.addEventListener("pointermove", onMove, { passive: true });

  const endTimer = window.setTimeout(() => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("resize", onResize);
    canvas.remove();
    trailCleanup = null;
  }, TRAIL_MS);

  trailCleanup = () => {
    window.clearTimeout(endTimer);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("resize", onResize);
    canvas.remove();
    trailCleanup = null;
  };
}

export const cursorTrailAction: MysteryAction = {
  run: () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    startPinkCursorTrail();
  },
  message: "Paint a pretty picture"
};
