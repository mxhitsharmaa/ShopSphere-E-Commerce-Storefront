
import type { Product, ProductFilters } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Everyday Essential Sneakers",
    category: "Footwear",
    price: 2499,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    color: "bg-red-50",
    description: "Comfortable everyday sneakers with a modern, versatile design.",
    stock: 15,
  },
  {
    id: 2,
    name: "Classic Minimal Watch",
    category: "Accessories",
    price: 3299,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",
    color: "bg-stone-100",
    description: "A timeless watch designed to complement everyday outfits.",
    stock: 12,
  },
  {
    id: 3,
    name: "Modern Everyday Backpack",
    category: "Bags",
    price: 1899,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
    color: "bg-amber-50",
    description: "A practical backpack with a clean design for daily essentials.",
    stock: 20,
  },
  {
    id: 4,
    name: "Premium Studio Headphones",
    category: "Electronics",
    price: 4299,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",
    color: "bg-orange-50",
    description: "Over-ear headphones for an immersive everyday listening experience.",
    stock: 8,
  },
  {
    id: 5,
    name: "Classic White Sneakers",
    category: "Footwear",
    price: 2199,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=700&q=85",
    color: "bg-slate-100",
    description: "Minimal white sneakers that work with casual everyday outfits.",
    stock: 18,
  },
  {
    id: 6,
    name: "Everyday Travel Backpack",
    category: "Bags",
    price: 2799,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=700&q=85",
    color: "bg-stone-100",
    description: "A versatile travel bag with room for your daily necessities.",
    stock: 10,
  },
  {
    id: 7,
    name: "Modern Smart Watch",
    category: "Accessories",
    price: 3999,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=700&q=85",
    color: "bg-gray-100",
    description: "A contemporary wristwatch with a sporty, modern look.",
    stock: 9,
  },
  {
    id: 8,
    name: "Wireless Audio Headphones",
    category: "Electronics",
    price: 3599,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=85",
    color: "bg-orange-50",
    description: "Wireless headphones made for music, travel, and everyday use.",
    stock: 14,
  },
];

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getFilteredProducts(
  filters: ProductFilters
): Promise<Product[]> {
  let result = [...products];

  if (filters.search.trim()) {
    const searchTerm = filters.search.toLowerCase().trim();

    result = result.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
  }

  if (filters.category !== "All") {
    result = result.filter(
      (product) => product.category === filters.category
    );
  }

  switch (filters.sortBy) {
    case "price-low":
      result.sort((a, b) => a.price - b.price);
      break;

    case "price-high":
      result.sort((a, b) => b.price - a.price);
      break;

    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;

    default:
      break;
  }

  return result;
}
