import { Product } from "@/types/products";
import { Update } from "@/types/update";
import { LOW_STOCK_THRESHOLD, SHOW_STOCK_COUNT } from "@/lib/config";

// Used until SHEET_API_URL is set in .env.local / Vercel. Remove once it is.
const FALLBACK_URL =
  "https://script.google.com/macros/s/AKfycbx4P7_Lim_Gw8fspWsbff7pcrdyJ1mJDjjVFpJOETD3LZFl4smp_3VPx56uboBUm0Tz/exec";

type SheetRow = Record<string, unknown>;

type SheetResponse = {
  inventory?: SheetRow[];
  updates?: SheetRow[];
  lastUpdated?: string;
  error?: string;
};

export type CatalogData = {
  products: Product[];
  updates: Update[];
  lastUpdated: string | null;
};

const text = (value: unknown) =>
  value === null || value === undefined ? "" : String(value).trim();

// "9,650", "HK$9650" and 9650 all become 9650. Anything unreadable becomes 0.
const num = (value: unknown) => {
  const n = Number(text(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const bool = (value: unknown, whenBlank: boolean) => {
  if (typeof value === "boolean") return value;
  const t = text(value).toLowerCase();
  if (t === "") return whenBlank;
  return ["true", "yes", "y", "1"].includes(t);
};

export async function getData(): Promise<CatalogData> {
  const base = process.env.SHEET_API_URL || FALLBACK_URL;
  const key = process.env.SHEET_API_KEY;
  const url = key
    ? `${base}${base.includes("?") ? "&" : "?"}key=${encodeURIComponent(key)}`
    : base;

  // Runs on the server. Vercel keeps the result for 60 seconds, so Apps Script
  // is hit about once a minute no matter how many customers visit.
  const response = await fetch(url, { next: { revalidate: 60 } });

  if (!response.ok) {
    throw new Error(`Sheet request failed with status ${response.status}`);
  }

  const data = (await response.json()) as SheetResponse;

  if (data.error) {
    throw new Error(`Sheet returned an error: ${data.error}`);
  }

  const products: Product[] = [];
  const seenIds = new Set<number>();

  (data.inventory ?? []).forEach((row, index) => {
    const model = text(row.Model);

    // Skip blank rows, and rows the shop has hidden with a Visible = FALSE column.
    if (!model) return;
    if (!bool(row.Visible, true)) return;

    let id = num(row.ID) || index + 1;
    while (seenIds.has(id)) id += 10000;
    seenIds.add(id);

    const stock = Math.max(0, Math.floor(num(row.Stock)));

    products.push({
      id,
      category: text(row.Category),
      brand: text(row.Brand),
      model,
      color: text(row.Color),
      storage: text(row.Storage),
      spec: text(row.Spec),
      condition: text(row.Condition),
      price: num(row.Price),
      availability:
        stock === 0 ? "out" : stock <= LOW_STOCK_THRESHOLD ? "low" : "in",
      // The exact number only leaves the server if the shop opts in.
      ...(SHOW_STOCK_COUNT ? { stockCount: stock } : {}),
      image: text(row.Image),
    });
  });

  const updates: Update[] = (data.updates ?? [])
    .map(
      (row): Update => ({
        type: text(row.Type),
        title: text(row.Title),
        active: bool(row.Active, false),
      })
    )
    // Unticked (inactive) updates are dropped here so they never reach the browser.
    .filter((update) => update.active && update.title !== "");

  const parsed = data.lastUpdated ? Date.parse(data.lastUpdated) : NaN;

  return {
    products,
    updates,
    lastUpdated: Number.isNaN(parsed) ? null : new Date(parsed).toISOString(),
  };
}
