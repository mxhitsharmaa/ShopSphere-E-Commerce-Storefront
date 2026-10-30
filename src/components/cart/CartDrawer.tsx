
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import type { Product } from "../../types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
}

export default function CartDrawer({
  isOpen,
  items,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
}: CartDrawerProps) {
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl dark:bg-gray-950">
        <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Shopping Cart
            </h2>
            <p className="text-sm text-gray-500">
              {items.reduce((total, item) => total + item.quantity, 0)} items
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping cart"
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
            <ShoppingBag size={48} className="mb-4 text-gray-400" />

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Your cart is empty
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Add some products to get started.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white dark:bg-white dark:text-black"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 border-b border-gray-200 pb-5 dark:border-gray-800"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-24 w-24 rounded-lg bg-gray-100 object-cover dark:bg-gray-800"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-gray-900 dark:text-white">
                      {item.product.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      ₹{item.product.price.toLocaleString("en-IN")}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-1 dark:border-gray-700">
                        <button
                          type="button"
                          onClick={() => onDecrease(item.product.id)}
                          aria-label="Decrease quantity"
                          className="p-1 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="min-w-4 text-center text-sm font-medium text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => onIncrease(item.product.id)}
                          disabled={item.quantity >= item.product.stock}
                          aria-label="Increase quantity"
                          className="p-1 text-gray-600 hover:text-black disabled:cursor-not-allowed disabled:opacity-30 dark:text-gray-300 dark:hover:text-white"
                        >
                          <Plus size={15} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemove(item.product.id)}
                        aria-label="Remove product"
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-5 dark:border-gray-800">
              <div className="mb-4 flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <button
                type="button"
                className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                Proceed to Checkout
              </button>

              <p className="mt-3 text-center text-xs text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
