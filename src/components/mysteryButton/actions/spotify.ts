import type { MysteryAction } from "../MysteryButton.interface";

const SPOTIFY_URL =
  "https://open.spotify.com/user/qzkliw9p48sr5ct0lpowweq5c?si=be96a850b4fd455b";

function openSpotify() {
  window.open(SPOTIFY_URL, "_blank", "noopener,noreferrer");
}

export const spotifyAction: MysteryAction = {
  run: () => openSpotify(),
  message: "Follow me on Spotify",
};
