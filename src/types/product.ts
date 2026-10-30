
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  color: string;
  description: string;
  stock: number;
}

export type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "rating";

export interface ProductFilters {
  category: string;
  search: string;
  sortBy: SortOption;
}
