
import { useEffect, useState } from "react";
import { getFilteredProducts } from "../services/products";
import type { Product, ProductFilters } from "../types/product";

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(
  filters: ProductFilters
): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        const data = await getFilteredProducts(filters);

        if (isActive) {
          setProducts(data);
        }
      } catch {
        if (isActive) {
          setError("Failed to load products. Please try again.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    void loadProducts();

    return () => {
      isActive = false;
    };
  }, [filters.search, filters.category, filters.sortBy]);

  return { products, loading, error };
}
