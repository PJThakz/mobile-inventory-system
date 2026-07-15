export type Product = {
  id: number;

  category: "Phone" | "Tablet" | "Laptop";

  brand: string;

  model: string;

  color: string;

  storage: string;

  spec: "HK" | "JP" | "US";

  condition: "Sealed" | "Unsealed";

  price: number;

  stock: number;
};