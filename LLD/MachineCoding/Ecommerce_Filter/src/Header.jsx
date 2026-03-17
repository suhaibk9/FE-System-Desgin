import { Link } from "react-router-dom";
import { ShoppingCartState } from "./Context/context";
const Header = () => {
  const { state } = ShoppingCartState();
  return (
    <div className="flex justify-end">
      <Link to="/cart">
        <button className="px-4 py-2 bg-gray-400">
          Cart {state.cart.length}
        </button>
      </Link>
    </div>
  );
};
export default Header;
