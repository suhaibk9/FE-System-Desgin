import { useReducer } from "react";
import { createContext } from "react";
import { filterReducer, shopReducer } from "./reducer";
import { useEffect } from "react";
import { useContext } from "react";

const cartContext = createContext();
const Context = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, {
    products: [],
    cart: [],
  });
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    byStock: false,
    byRating: 0,
    searchQuery: "",
    sort: "LowToHigh",
  });
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    const formattedData = {
      products: data.products.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        rating: product.rating,
        category: product.category,
        thumbnail: product.thumbnail,
        inStock: product.stock > 0,
      })),
      total: data.total,
      skip: data.skip,
      limit: data.limit,
    };

    dispatch({
      type: "FETCH_PRODUCTS",
      payload: formattedData,
    });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <cartContext.Provider
      value={{ state, dispatch, filterState, filterDispatch }}
    >
      {children}
    </cartContext.Provider>
  );
};
export const ShoppingCartState = () => useContext(cartContext);
export default Context;
