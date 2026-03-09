import demoImage from "../assets/headshots/smile.png";
import syncedPhotos from "./dailyPhotos.json";

export interface DailyPhoto {
	date: string;
	src: string;
	alt?: string;
}

/** Demo entries when no Drive sync has been run. */
const demoPhotos: DailyPhoto[] = [
	{ date: "2026-03-08", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-03-07", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-03-06", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-03-05", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-03-04", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-03-03", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-03-02", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-03-01", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-02-28", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-02-27", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-02-26", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-02-25", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-02-24", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-02-23", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-02-22", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-02-21", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-02-20", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-02-19", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-02-18", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-02-17", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-02-16", src: demoImage.src, alt: "Street at night" },
	{ date: "2026-02-15", src: demoImage.src, alt: "Street at night" },
];

/** Synced from Drive when you run `npm run photos:sync`; otherwise demo. */
export const dailyPhotos: DailyPhoto[] =
	Array.isArray(syncedPhotos) && syncedPhotos.length > 0 ? syncedPhotos : demoPhotos;

export function getPhotosByDate(): Map<string, DailyPhoto> {
	const map = new Map<string, DailyPhoto>();
	for (const p of dailyPhotos) {
		map.set(p.date, p);
	}
	return map;
}

export function getMonthsWithPhotos(): { year: number; month: number }[] {
	const set = new Set<string>();
	for (const p of dailyPhotos) {
		const [y, m] = p.date.split("-").map(Number);
		set.add(`${y}-${m}`);
	}
	return Array.from(set)
		.sort()
		.map((key) => {
			const [y, m] = key.split("-").map(Number);
			return { year: y, month: m };
		});
}

export function getPreviousNextMonth(
	year: number,
	month: number,
): { prev: { year: number; month: number } | null; next: { year: number; month: number } | null } {
	const months = getMonthsWithPhotos();
	const index = months.findIndex((m) => m.year === year && m.month === month);
	if (index === -1) return { prev: null, next: null };
	return {
		prev: index > 0 ? months[index - 1]! : null,
		next: index < months.length - 1 ? months[index + 1]! : null,
	};
}

export function getPreviousNextDay(
	dateStr: string,
): { prev: string | null; next: string | null } {
	const sorted = [...dailyPhotos.map((p) => p.date)].sort();
	const index = sorted.indexOf(dateStr);
	if (index === -1) return { prev: null, next: null };
	return {
		prev: index > 0 ? sorted[index - 1]! : null,
		next: index < sorted.length - 1 ? sorted[index + 1]! : null,
	};
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December",
];

export function getCalendarMonth(year: number, month: number): {
	monthName: string;
	year: number;
	dayLabels: string[];
	weeks: (null | { day: number; dateStr: string })[][];
} {
	const first = new Date(year, month - 1, 1);
	const last = new Date(year, month, 0);
	const daysInMonth = last.getDate();
	const startWeekday = first.getDay();

	const weeks: (null | { day: number; dateStr: string })[][] = [];
	let week: (null | { day: number; dateStr: string })[] = [];

	for (let i = 0; i < startWeekday; i++) {
		week.push(null);
	}

	for (let day = 1; day <= daysInMonth; day++) {
		const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
		week.push({ day, dateStr });
		if (week.length === 7) {
			weeks.push(week);
			week = [];
		}
	}

	if (week.length > 0) {
		while (week.length < 7) week.push(null);
		weeks.push(week);
	}

	return {
		monthName: MONTH_NAMES[month - 1],
		year,
		dayLabels: DAY_LABELS,
		weeks,
	};
}
