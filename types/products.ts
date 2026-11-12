export type Availability = "in" | "low" | "out";

export type Product = {
  id: number;

  // Plain strings so new categories (Watch, Airpods, ...) just work
  // when they are added to the sheet.
  category: string;

  brand: string;

  model: string;

  color: string;

  storage: string;

  spec: string;

  condition: string;

  // 0 means "no price entered" and is shown as "Price on request".
  price: number;

  availability: Availability;

  // Only present when SHOW_STOCK_COUNT is true in lib/config.ts.
  stockCount?: number;

  image: string;
};
