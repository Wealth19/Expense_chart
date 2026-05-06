import type { ICategory } from "./types/expense";

const CATEGORIES = [
  { label: "Food", value: "food" },
  { label: "Transport", value: "transport" },
  { label: "Shopping ", value: "shopping" },
  { label: "Education", value: "education" },
  { label: "Bills", value: "bills" },
  { label: "Health", value: "health" },
  { label: "Other", value: "other" },
];

const CATEGORY_ICON: Record<ICategory, string> = {
  food: "🥝",
  transport: "🚇",
  education: "📚",
  shopping: "🛒",
  entertainment: "🎬",
  bills: "💸",
  health: "💊",
  other: "📌"
};

const CATEGORY_COLORS: Record<ICategory, string> = {
  food: "hsl(174, 72%, 40%)",
  transport: "hsl(250, 60%, 58%)",
  shopping: "hsl(45, 85%, 52%)",
  entertainment: "hsl(330, 65%, 55%)",
  bills: "hsl(200, 75%, 50%)",
  health: "hsl(140, 50%, 45%)",
  education: "hsl(270, 55%, 50%)",
  other: "hsl(225, 12%, 48%)",
};

export { CATEGORIES, CATEGORY_COLORS, CATEGORY_ICON }