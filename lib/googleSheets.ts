import { Product } from "@/types/products";
type GoogleSheetProduct = {
  ID: number;
  Category: string;
  Brand: string;
  Model: string;
  Color: string;
  Storage: string;
  Spec: string;
  Condition: string;
  Stock: number;
  Price: number;
};

export async function getProducts() {
  const response = await fetch("https://script.google.com/macros/s/AKfycbxc8vpWYs-4UTYdD3zmwP0qCJZohsbOdt_zPtiiT0IA1w_jm05XfAN90pQxZPzTSsgd/exec", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: GoogleSheetProduct[] = await response.json();

  return data.map((item): Product => ({
    id: item.ID,
    category: item.Category as Product["category"],
    brand: item.Brand,
    model: item.Model,
    color: item.Color,
    storage: item.Storage,
    spec: item.Spec as Product["spec"],
condition: item.Condition as Product["condition"],
    stock: Number(item.Stock),
    price: Number(item.Price),
  }));
}