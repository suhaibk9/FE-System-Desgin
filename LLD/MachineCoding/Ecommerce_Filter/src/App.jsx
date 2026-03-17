import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout";
import Home from "./Home";
import Cart from "./Cart";
import "./App.css";
import Context from "./Context/context";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);
const App = () => {
  return (
    <Context>
      <RouterProvider router={router} />
    </Context>
  );
};
export default App;
