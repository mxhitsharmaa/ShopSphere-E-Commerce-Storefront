
import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "../../types/product";

type ProductCardProps = {
  product: Product;
  isWishlisted: boolean;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
};

function ProductCard({
  product,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) {
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className={`relative overflow-hidden ${product.color}`}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <button
          type="button"
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={isWishlisted}
          onClick={() => onToggleWishlist(product)}
          className={`absolute right-3 top-3 rounded-full bg-white p-2.5 shadow-sm transition ${
            isWishlisted
              ? "text-rose-500"
              : "text-slate-700 hover:text-rose-500"
          }`}
        >
          <Heart
            size={19}
            fill={isWishlisted ? "currentColor" : "none"}
          />
        </button>

        {isLowStock && (
          <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-600 shadow-sm">
            Only {product.stock} left
          </span>
        )}

        {isOutOfStock && (
          <span className="absolute bottom-3 left-3 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            Out of stock
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {product.category}
        </p>

        <h3 className="mt-2 min-h-12 font-bold text-slate-900">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
          {product.description}
        </p>

        <div className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
          <Star
            size={15}
            className="fill-amber-400 text-amber-400"
          />
          <span>{product.rating.toFixed(1)}</span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-black text-slate-900">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <button
            type="button"
            disabled={isOutOfStock}
            onClick={() => onAddToCart(product)}
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <ShoppingBag size={15} />
            {isOutOfStock ? "Sold out" : "Add to bag"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
