import type { ImageMetadata } from "astro";
import concertsData from "./concerts.json";

export type ConcertTextColor = "white" | "black";

export interface Concert {
  artist: string;
  date: string;
  venue: string;
  city: string;
  openers?: string[];
  image?: string;
  textColor?: ConcertTextColor;
}

export interface ConcertResolved extends Omit<Concert, "image"> {
  image?: ImageMetadata;
  textColor: ConcertTextColor;
}

export const concerts: Concert[] = concertsData as Concert[];

const concertImages = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/concertPics/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

export function resolveConcertImage(
  filename?: string,
): ImageMetadata | undefined {
  if (!filename) return undefined;
  return concertImages[`../assets/concertPics/${filename}`]?.default;
}

const MONTH_ABBR = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

export function getConcertsByYear(list: Concert[] = concerts) {
  const sorted = [...list].sort((a, b) => b.date.localeCompare(a.date));
  const byYear = new Map<number, ConcertResolved[]>();

  for (const concert of sorted) {
    const resolved: ConcertResolved = {
      artist: concert.artist,
      date: concert.date,
      venue: concert.venue,
      city: concert.city,
      openers: concert.openers,
      textColor: concert.textColor ?? "black",
      image: resolveConcertImage(concert.image),
    };
    const year = Number(concert.date.slice(0, 4));
    const group = byYear.get(year);
    if (group) group.push(resolved);
    else byYear.set(year, [resolved]);
  }

  return [...byYear.entries()].map(([year, items]) => ({
    year,
    concerts: items,
  }));
}

export function formatConcertDate(dateStr: string) {
  const [, month, day] = dateStr.split("-").map(Number);
  return {
    month: MONTH_ABBR[month - 1],
    day: String(day).padStart(2, "0"),
  };
}
