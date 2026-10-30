
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Heart,
  Search,
  ShoppingBag,
  Truck,
} from "lucide-react";

import ProductGrid from "../components/products/ProductGrid";
import { useProducts } from "../hooks/useProducts";
import CartDrawer, {
  type CartItem,
} from "../components/cart/CartDrawer";

import type {
  Product,
  ProductFilters,
  SortOption,
} from "../types/product";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] =
    useState<SortOption>("featured");

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);

  const filters: ProductFilters = {
    search: searchQuery,
    category: selectedCategory,
    sortBy: sortOption,
  };

  const { products, loading, error } = useProducts(filters);

  const categories = useMemo(
    () => [
      "All",
      "Footwear",
      "Accessories",
      "Bags",
      "Electronics",
    ],
    []
  );

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function addToCart(product: Product) {
    if (product.stock <= 0) return;

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          return currentCart;
        }

        return currentCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { product, quantity: 1 }];
    });
  }

  function increaseQuantity(productId: number) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.product.id === productId &&
        item.quantity < item.product.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(productId: number) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId: number) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.product.id !== productId
      )
    );
  }

  function toggleWishlist(product: Product) {
    setWishlistIds((currentIds) =>
      currentIds.includes(product.id)
        ? currentIds.filter((id) => id !== product.id)
        : [...currentIds, product.id]
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="bg-slate-950 px-4 py-2.5 text-center text-xs font-medium tracking-wide text-white">
        FREE SHIPPING ON ORDERS OVER ₹2,999
      </div>

      <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 lg:px-8">
          <a
            href="#home"
            className="shrink-0 text-2xl font-black tracking-tight"
          >
            shop<span className="text-orange-500">sphere.</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <a href="#home" className="hover:text-orange-500">
              Home
            </a>
            <a href="#products" className="hover:text-orange-500">
              Shop
            </a>
            <a href="#benefits" className="hover:text-orange-500">
              About
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#products"
              aria-label="Find products"
              className="rounded-full p-2 hover:bg-slate-100"
            >
              <Search size={20} />
            </a>

            <button
              type="button"
              aria-label={`Wishlist, ${wishlistIds.length} items`}
              onClick={() =>
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="relative rounded-full p-2 hover:bg-slate-100"
            >
              <Heart size={20} />

              {wishlistIds.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] text-white">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            <button
              type="button"
              aria-label={`${cartCount} items in shopping bag`}
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-full p-2 hover:bg-slate-100"
            >
              <ShoppingBag size={20} />

              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] text-white">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main>
        <section
          id="home"
          className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-2 lg:px-8 lg:py-20"
        >
          <div className="max-w-xl">
            <span className="inline-flex rounded-full bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-600">
              Your everyday, upgraded
            </span>

            <h1 className="mt-6 text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Find your
              <br />
              next{" "}
              <span className="text-orange-500">
                favorite.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-slate-500 sm:text-lg">
              Thoughtfully selected essentials, timeless designs,
              and everyday products made to fit your lifestyle.
            </p>

            <a
              href="#products"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white transition hover:bg-orange-500"
            >
              Explore collection
              <ArrowRight size={18} />
            </a>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-500">
              <span>✓ Quality essentials</span>
              <span>✓ Easy returns</span>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=90"
              alt="Modern retail storefront"
              fetchPriority="high"
              className="h-[360px] w-full rounded-3xl object-cover sm:h-[480px]"
            />

            <div className="absolute bottom-5 left-5 rounded-2xl bg-white p-4 shadow-xl sm:bottom-7 sm:left-7">
              <p className="text-xs text-slate-500">
                Curated for you
              </p>
              <p className="mt-1 text-lg font-bold">
                The new essentials
              </p>
            </div>
          </div>
        </section>

        <section
          id="products"
          className="scroll-mt-24 bg-slate-50 px-5 py-16 sm:py-20 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  The collection
                </p>

                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  Popular right now
                </h2>

                <p className="mt-3 text-slate-500">
                  {loading
                    ? "Loading products..."
                    : `${products.length} products to explore`}
                </p>
              </div>

              <label className="flex items-center gap-2 text-sm font-medium">
                Sort by

                <select
                  value={sortOption}
                  onChange={(event) =>
                    setSortOption(event.target.value as SortOption)
                  }
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-orange-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to high</option>
                  <option value="price-high">Price: High to low</option>
                  <option value="rating">Top rated</option>
                </select>
              </label>
            </div>

            <label className="mt-8 flex max-w-xl items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 focus-within:border-orange-500">
              <Search size={20} className="shrink-0 text-slate-400" />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search sneakers, watches, bags..."
                aria-label="Search products"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </label>

            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    selectedCategory === category
                      ? "bg-slate-950 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-slate-950"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-8">
              {loading ? (
                <div className="py-20 text-center text-slate-500">
                  Loading products...
                </div>
              ) : error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
                  {error}
                </div>
              ) : (
                <ProductGrid
                  products={products}
                  wishlistIds={wishlistIds}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                />
              )}
            </div>
          </div>
        </section>

        <section
          id="benefits"
          className="px-5 py-16 lg:px-8"
        >
          <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-3">
            <div>
              <Truck className="text-orange-500" size={30} />
              <h3 className="mt-4 font-bold">Delivery made easy</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                A straightforward experience from browsing to delivery.
              </p>
            </div>

            <div>
              <Heart className="text-orange-500" size={30} />
              <h3 className="mt-4 font-bold">Thoughtful selection</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Discover a curated collection of everyday essentials.
              </p>
            </div>

            <div>
              <ShoppingBag className="text-orange-500" size={30} />
              <h3 className="mt-4 font-bold">Easy shopping</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                A responsive storefront for desktop, tablet, and mobile.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 px-5 py-8 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} ShopSphere. Built with React and TypeScript.
      </footer>

      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
      />
    </div>
  );
}

export default Home;
