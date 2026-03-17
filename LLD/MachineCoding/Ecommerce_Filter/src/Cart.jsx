import { ShoppingCartState } from "./Context/context";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = ShoppingCartState();

  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
        <h2 className="text-2xl font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-sm text-gray-500">
          Add products from the store to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Shopping Cart</h2>

        {cart.map((item) => (
          <article
            key={item.id}
            className="flex gap-4 rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-24 w-24 rounded object-cover"
            />

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  ${item.price} each
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-1">
                  <button
                    type="button"
                    className="h-8 w-8 rounded-md border border-gray-300 bg-white text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={item.qty <= 1}
                    onClick={() =>
                      dispatch({
                        type: "CHANGE_QTY",
                        payload: {
                          id: item.id,
                          qty: item.qty - 1,
                        },
                      })
                    }
                  >
                    -
                  </button>
                  <span className="min-w-8 text-center text-sm font-semibold text-gray-800">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    className="h-8 w-8 rounded-md border border-gray-300 bg-white text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                    onClick={() =>
                      dispatch({
                        type: "CHANGE_QTY",
                        payload: {
                          id: item.id,
                          qty: item.qty + 1,
                        },
                      })
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="rounded-md border border-red-200 px-3 py-1 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: item,
                    })
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      <aside className="h-fit rounded-lg border border-gray-200 p-4 shadow-sm">
        <h3 className="text-lg font-semibold">Order Summary</h3>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span>Total Items</span>
            <span className="font-medium">{totalItems}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </aside>
    </div>
  );
};
export default Cart;
