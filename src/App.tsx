
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Heart,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Truck,
  X,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  color: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Everyday Essential Sneakers",
    category: "Footwear",
    price: 2499,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    color: "bg-red-50",
  },
  {
    id: 2,
    name: "Classic Minimal Watch",
    category: "Accessories",
    price: 3299,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",
    color: "bg-stone-100",
  },
  {
    id: 3,
    name: "Modern Everyday Backpack",
    category: "Bags",
    price: 1899,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
    color: "bg-amber-50",
  },
  {
    id: 4,
    name: "Premium Studio Headphones",
    category: "Electronics",
    price: 4299,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",
    color: "bg-orange-50",
  },
  {
    id: 5,
    name: "Classic White Sneakers",
    category: "Footwear",
    price: 2199,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=85",
    color: "bg-slate-100",
  },
  {
    id: 6,
    name: "Everyday Travel Backpack",
    category: "Bags",
    price: 2799,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=700&q=85",
    color: "bg-emerald-50",
  },
  {
    id: 7,
    name: "Modern Smart Watch",
    category: "Accessories",
    price: 3999,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=85",
    color: "bg-zinc-100",
  },
  {
    id: 8,
    name: "Wireless Audio Headphones",
    category: "Electronics",
    price: 3599,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=700&q=85",
    color: "bg-sky-50",
  },
];

const formatPrice = (price: number) =>
  `₹${price.toLocaleString("en-IN")}`;

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = `${product.name} ${product.category}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const matchesWishlist =
        !showWishlist || wishlistIds.includes(product.id);

      return matchesSearch && matchesCategory && matchesWishlist;
    });

    if (sortOption === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [
    searchQuery,
    selectedCategory,
    sortOption,
    showWishlist,
    wishlistIds,
  ]);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  function addToCart(product: Product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { product, quantity: 1 }];
    });

    setNotice(`${product.name} added to your bag`);
    setTimeout(() => setNotice(""), 2500);
  }

  function toggleWishlist(product: Product) {
    setWishlistIds((currentIds) =>
      currentIds.includes(product.id)
        ? currentIds.filter((id) => id !== product.id)
        : [...currentIds, product.id],
    );
  }

  function updateQuantity(productId: number, change: number) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function resetFilters() {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortOption("featured");
    setShowWishlist(false);
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="bg-slate-950 px-4 py-2.5 text-center text-xs font-medium tracking-wide text-white">
        FREE SHIPPING ON ORDERS OVER ₹2,999
      </div>

      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <a
            href="#home"
            className="shrink-0 text-2xl font-black tracking-tight"
            aria-label="ShopSphere home"
          >
            shop<span className="text-orange-500">sphere.</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#home" className="transition hover:text-orange-500">
              Home
            </a>
            <a
              href="#products"
              onClick={() => setShowWishlist(false)}
              className="transition hover:text-orange-500"
            >
              Shop
            </a>
            <a
              href="#benefits"
              className="transition hover:text-orange-500"
            >
              Why ShopSphere
            </a>
          </nav>

          <div className="flex items-center gap-1 sm:gap-3">
            <button
              type="button"
              aria-label="Go to product search"
              onClick={() =>
                document.getElementById("product-search")?.focus()
              }
              className="rounded-full p-2 transition hover:bg-slate-100"
            >
              <Search size={21} />
            </button>

            <button
              type="button"
              aria-label={`Wishlist, ${wishlistIds.length} products`}
              aria-pressed={showWishlist}
              onClick={() => {
                setShowWishlist((current) => !current);
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className={`relative rounded-full p-2 transition hover:bg-slate-100 ${
                showWishlist ? "text-orange-500" : ""
              }`}
            >
              <Heart
                size={21}
                fill={showWishlist ? "currentColor" : "none"}
              />
              {wishlistIds.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            <button
              type="button"
              aria-label={`Shopping bag, ${cartCount} items`}
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-full p-2 transition hover:bg-slate-100"
            >
              <ShoppingBag size={21} />
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
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
            <span className="inline-flex items-center rounded-full bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-600">
              Your everyday, upgraded
            </span>

            <h1 className="mt-6 text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Find your
              <br />
              next <span className="text-orange-500">favorite.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-slate-500 sm:text-lg">
              Thoughtfully selected essentials, timeless designs, and
              everyday products made to fit your lifestyle.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#products"
                onClick={() => setShowWishlist(false)}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white transition hover:bg-orange-500"
              >
                Explore collection <ArrowRight size={18} />
              </a>
              <a
                href="#benefits"
                className="rounded-full border border-slate-200 px-7 py-4 text-sm font-semibold transition hover:border-slate-900"
              >
                Discover more
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-500">
              <span>✓ Quality essentials</span>
              <span>✓ Easy returns</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full bg-orange-100 blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=90"
              alt="Modern retail store with a curated product collection"
              fetchPriority="high"
              className="relative h-[360px] w-full rounded-3xl object-cover sm:h-[480px]"
            />
            <div className="absolute bottom-5 left-5 rounded-2xl bg-white p-4 shadow-xl sm:bottom-7 sm:left-7">
              <p className="text-xs text-slate-500">Curated for you</p>
              <p className="mt-1 text-lg font-bold">The new essentials</p>
            </div>
          </div>
        </section>

        <section
          id="products"
          className="scroll-mt-20 bg-slate-50 px-5 py-16 sm:py-20 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                  The collection
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  {showWishlist ? "Your wishlist" : "Popular right now"}
                </h2>
                <p className="mt-3 text-slate-500">
                  {showWishlist
                    ? "Your saved everyday favorites."
                    : "Everyday favorites worth discovering."}
                </p>
              </div>

              <span className="text-sm font-medium text-slate-500">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="product-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search products..."
                  aria-label="Search products"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <label className="flex items-center gap-3">
                <span className="whitespace-nowrap text-sm text-slate-500">
                  Sort by
                </span>
                <select
                  value={sortOption}
                  onChange={(event) => setSortOption(event.target.value)}
                  aria-label="Sort products"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-orange-400 sm:w-auto"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to high</option>
                  <option value="price-high">Price: High to low</option>
                  <option value="rating">Top rated</option>
                </select>
              </label>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowWishlist(false);
                  }}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    selectedCategory === category && !showWishlist
                      ? "bg-slate-950 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:text-orange-600"
                  }`}
                >
                  {category}
                </button>
              ))}

              {showWishlist && (
                <button
                  type="button"
                  onClick={() => setShowWishlist(false)}
                  className="rounded-full border border-orange-200 bg-orange-50 px-5 py-2.5 text-sm font-semibold text-orange-600"
                >
                  Showing wishlist <X size={14} className="ml-1 inline" />
                </button>
              )}
            </div>

            {filteredProducts.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlistIds.includes(product.id);
                  const cartItem = cart.find(
                    (item) => item.product.id === product.id,
                  );

                  return (
                    <article
                      key={product.id}
                      className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div
                        className={`relative overflow-hidden ${product.color}`}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                        <button
                          type="button"
                          aria-label={
                            isWishlisted
                              ? `Remove ${product.name} from wishlist`
                              : `Add ${product.name} to wishlist`
                          }
                          aria-pressed={isWishlisted}
                          onClick={() => toggleWishlist(product)}
                          className={`absolute right-3 top-3 rounded-full bg-white p-2.5 shadow-sm transition hover:text-orange-500 ${
                            isWishlisted ? "text-orange-500" : "text-slate-700"
                          }`}
                        >
                          <Heart
                            size={18}
                            fill={isWishlisted ? "currentColor" : "none"}
                          />
                        </button>

                        {product.id === 3 && (
                          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-800">
                            Bestseller
                          </span>
                        )}
                      </div>

                      <div className="p-5">
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                          {product.category}
                        </p>
                        <h3 className="mt-2 min-h-12 font-bold leading-6">
                          {product.name}
                        </h3>

                        <div className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
                          <Star
                            size={15}
                            className="fill-amber-400 text-amber-400"
                          />
                          {product.rating}
                          <span className="text-slate-300">
                            ·
                          </span>
                          <span>Customer rating</span>
                        </div>

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <span className="text-lg font-black">
                            {formatPrice(product.price)}
                          </span>
                          <button
                            type="button"
                            onClick={() => addToCart(product)}
                            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-500"
                          >
                            {cartItem ? (
                              <>
                                <Check size={15} /> Added ({cartItem.quantity})
                              </>
                            ) : (
                              <>
                                <ShoppingBag size={15} /> Add to bag
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                  {showWishlist ? (
                    <Heart size={25} />
                  ) : (
                    <Search size={25} />
                  )}
                </div>
                <h3 className="mt-5 text-lg font-bold">
                  {showWishlist
                    ? "Your wishlist is empty"
                    : "No products found"}
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  {showWishlist
                    ? "Tap the heart on a product to save it here."
                    : "Try another search term or choose a different category."}
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
                >
                  Explore all products
                </button>
              </div>
            )}
          </div>
        </section>

        <section id="benefits" className="px-5 py-16 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-3">
            <div>
              <Truck className="text-orange-500" size={30} />
              <h3 className="mt-4 font-bold">Delivery made easy</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                A simple shopping experience from browsing to delivery.
              </p>
            </div>

            <div>
              <Heart className="text-orange-500" size={30} />
              <h3 className="mt-4 font-bold">Thoughtful selection</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Explore a curated collection of everyday essentials.
              </p>
            </div>

            <div>
              <ShoppingBag className="text-orange-500" size={30} />
              <h3 className="mt-4 font-bold">Easy shopping</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                A clean, responsive storefront built for every screen.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 px-5 py-8 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} ShopSphere. Built with React and TypeScript.
      </footer>

      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-50 flex max-w-[90%] -translate-x-1/2 items-center gap-3 rounded-xl bg-slate-950 px-5 py-4 text-sm font-medium text-white shadow-xl"
        >
          <Check size={18} className="shrink-0 text-emerald-400" />
          {notice}
        </div>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            aria-label="Close shopping cart"
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 cursor-default bg-slate-950/40"
          />

          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 id="cart-title" className="text-xl font-black">
                  Your shopping bag
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close shopping cart"
                onClick={() => setIsCartOpen(false)}
                className="rounded-full p-2 transition hover:bg-slate-100"
              >
                <X size={21} />
              </button>
            </div>

            {cart.length > 0 ? (
              <>
                <div className="flex-1 space-y-5 overflow-y-auto p-6">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-24 w-24 rounded-xl bg-slate-100 object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold leading-5">
                          {item.product.name}
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">
                          {formatPrice(item.product.price)}
                        </p>

                        <div className="mt-3 inline-flex items-center gap-3 rounded-full border border-slate-200 px-2 py-1">
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${item.product.name}`}
                            onClick={() =>
                              updateQuantity(item.product.id, -1)
                            }
                            className="rounded-full p-1 hover:bg-slate-100"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="min-w-4 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase quantity of ${item.product.name}`}
                            onClick={() =>
                              updateQuantity(item.product.id, 1)
                            }
                            className="rounded-full p-1 hover:bg-slate-100"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <p className="shrink-0 text-sm font-bold">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 p-6">
                  <div className="mb-2 flex justify-between text-sm text-slate-500">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="mb-4 flex justify-between text-sm text-slate-500">
                    <span>Shipping</span>
                    <span>
                      {subtotal >= 2999 ? "Free" : "Calculated at checkout"}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-black">
                    <span>Total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setNotice("Checkout will be added in the next step.");
                      setIsCartOpen(false);
                      setTimeout(() => setNotice(""), 3000);
                    }}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-orange-500"
                  >
                    Proceed to checkout <ArrowRight size={17} />
                  </button>
                  <p className="mt-3 text-center text-xs text-slate-400">
                    Secure checkout integration can be added next.
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                  <ShoppingBag size={28} />
                </div>
                <h3 className="mt-5 text-lg font-bold">
                  Your bag is empty
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  Discover everyday essentials and add your favorites to the bag.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    document.getElementById("products")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className="mt-6 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
                >
                  Start shopping
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
