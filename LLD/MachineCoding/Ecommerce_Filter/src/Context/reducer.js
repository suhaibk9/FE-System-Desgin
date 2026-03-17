export const shopReducer = (state, action) => {
  if (action.type === "FETCH_PRODUCTS") {
    return { ...state, products: action.payload.products };
  }
  if (action.type === "ADD_TO_CART") {
    return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
  }
  if (action.type === "REMOVE_FROM_CART") {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload.id),
    };
  }
  if (action.type === "CHANGE_QTY") {
    return {
      ...state,
      cart: state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, qty: action.payload.qty }
          : item,
      ),
    };
  }
  return state;
};
export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };
    case "FILTER_BY_STOCK":
      return { ...state, byStock: action.payload };
    case "FILTER_BY_RATING":
      return { ...state, byRating: action.payload };
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "CLEAR_FILTERS":
      return {
        ...state,
        byStock: false,
        byRating: 0,
        searchQuery: "",
        sort: "",
      };
    default:
      return state;
  }
};
