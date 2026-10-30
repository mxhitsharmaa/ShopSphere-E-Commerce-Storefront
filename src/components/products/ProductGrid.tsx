
import type { Product } from "../../types/product";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  wishlistIds: number[];
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
};

function ProductGrid({
  products,
  wishlistIds,
  onAddToCart,
  onToggleWishlist,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <h3 className="text-xl font-bold text-slate-900">
          No products found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Try another search term or select a different category.
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Product collection">
      <p className="mb-5 text-sm text-slate-500">
        Showing {products.length} products
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlistIds.includes(product.id)}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductGrid;
