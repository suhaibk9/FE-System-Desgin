import { useSearchParams } from "react-router-dom";
import { ShoppingCartState } from "./Context/context";
import StarRating from "./StarRating";
import { useEffect } from "react";

const Filters = () => {
  const { filterState, filterDispatch } = ShoppingCartState();
  const filterMap = {
    sort: "SORT_BY_PRICE",
    stock: "FILTER_BY_STOCK",
    rating: "FILTER_BY_RATING",
    search: "FILTER_BY_SEARCH",
  };
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.size) {
      searchParams.forEach((value, key) => {
        filterDispatch({
          type: filterMap[key],
          payload: value,
        });
      });
    }
  }, []);
  useEffect(() => {
    setSearchParams(filterState);
  }, [filterState]);
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <span className="font-bold">Filter Products</span>

      <div className="mt-4 flex flex-col gap-4">
        <input
          type="text"
          className="rounded border border-gray-300 p-2 text-sm"
          placeholder="Search products"
          value={filterState.searchQuery}
          onChange={(e) =>
            filterDispatch({
              type: "FILTER_BY_SEARCH",
              payload: e.target.value,
            })
          }
        />

        <div className="flex flex-col gap-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              checked={filterState.sort === "LowToHigh"}
              onChange={() =>
                filterDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "LowToHigh",
                })
              }
            />
            Price: Low to High
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              checked={filterState.sort === "HighToLow"}
              onChange={() =>
                filterDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "HighToLow",
                })
              }
            />
            Price: High to Low
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filterState.byStock}
            onChange={(e) =>
              filterDispatch({
                type: "FILTER_BY_STOCK",
                payload: e.target.checked,
              })
            }
          />
          Include Out of Stock
        </label>

        <div className="flex items-center gap-2">
          <span className="text-sm">Minimum Rating:</span>
          <StarRating
            size={5}
            rating={filterState.byRating}
            onChange={(newRating) =>
              filterDispatch({
                type: "FILTER_BY_RATING",
                payload: newRating,
              })
            }
          />
        </div>

        <button
          type="button"
          className="rounded border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50"
          onClick={() => filterDispatch({ type: "CLEAR_FILTERS" })}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};
export default Filters;
