export type MysteryEffectContext = {
  confettiRect: DOMRect | null;
};

export type MysteryMessage = string | (() => string);

export type MysteryAction = {
  run: (
    trigger: HTMLElement | null,
    ctx: MysteryEffectContext,
  ) => void;
  message: MysteryMessage;
};
