import { useEffect, useMemo, useState } from "react";
import { ShoppingCartState } from "./Context/context";
import Pagination from "./Pagination";
import StarRating from "./StarRating";
import Filters from "./Filters";

const Home = () => {
  const [page, setPage] = useState(1);
  const [userRatings, setUserRatings] = useState({});
  const productsPerPage = 10;
  const {
    state: { products, cart },
    dispatch,
    filterState: { byStock, byRating, searchQuery, sort },
  } = ShoppingCartState();

  const transformedProducts = useMemo(() => {
    let filteredProducts = [...products];

    if (sort) {
      filteredProducts.sort((a, b) =>
        sort === "LowToHigh" ? a.price - b.price : b.price - a.price,
      );
    }

    if (!byStock) {
      filteredProducts = filteredProducts.filter((product) => product.inStock);
    }

    if (byRating) {
      filteredProducts = filteredProducts.filter(
        (product) => Math.round(product.rating) >= byRating,
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return filteredProducts;
  }, [products, sort, byStock, byRating, searchQuery]);

  const totalPage = Math.ceil(
    (transformedProducts?.length || 0) / productsPerPage,
  );
  const startIndex = (page - 1) * productsPerPage;
  const displayedProducts = transformedProducts?.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  useEffect(() => {
    setPage(1);
  }, [byStock, byRating, searchQuery, sort]);

  const handleRatingChange = (productId, newRating) => {
    setUserRatings((prev) => ({
      ...prev,
      [productId]: newRating,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Store</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Filters />

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {displayedProducts?.map((product) => {
              const isInCart = cart.some((item) => item.id === product.id);
              let currentQuantity =
                cart.find((item) => item.id === product.id)?.qty || 0;
              return (
                <article
                  key={product.id}
                  className="rounded-lg border border-gray-200 p-4 shadow-sm"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="mb-3 h-40 w-full rounded object-cover"
                  />
                  <h3 className="text-base font-medium">{product.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {product.description}
                  </p>
                  <p className="mt-3 text-sm font-semibold">${product.price}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <StarRating
                      size={5}
                      rating={
                        userRatings[product.id] ?? Math.round(product.rating)
                      }
                      onChange={(newRating) =>
                        handleRatingChange(product.id, newRating)
                      }
                    />
                    <span className="text-xs text-gray-500">
                      {(
                        userRatings[product.id] ?? Math.round(product.rating)
                      ).toFixed(1)}
                    </span>
                  </div>
                  {isInCart ? (
                    <div className="mt-3 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-1">
                      <button
                        className="h-8 w-8 rounded-md border border-gray-300 bg-white text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                        onClick={() =>
                          dispatch({
                            type: "CHANGE_QTY",
                            payload: {
                              id: product.id,
                              qty: currentQuantity - 1,
                            },
                          })
                        }
                      >
                        -
                      </button>
                      <span className="min-w-8 text-center text-sm font-semibold text-gray-800">
                        {currentQuantity}
                      </span>
                      <button
                        className="h-8 w-8 rounded-md border border-gray-300 bg-white text-lg font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                        onClick={() =>
                          dispatch({
                            type: "CHANGE_QTY",
                            payload: {
                              id: product.id,
                              qty: currentQuantity + 1,
                            },
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        dispatch({
                          type: "ADD_TO_CART",
                          payload: product,
                        })
                      }
                      disabled={!product.inStock}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow transition-colors duration-200"
                    >
                      {product.inStock ? "Add To Cart" : "Out Of Stocket"}
                    </button>
                  )}
                </article>
              );
            })}
          </div>

          {displayedProducts?.length === 0 && (
            <p className="text-sm text-gray-500">
              No products matched the selected filters.
            </p>
          )}

          {totalPage > 1 && (
            <Pagination
              products={transformedProducts}
              totalPage={totalPage}
              page={page}
              setPage={setPage}
              maxVisible={5}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
