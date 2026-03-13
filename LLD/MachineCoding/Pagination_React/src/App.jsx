import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Pagination from "./Components/Pagination";
const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const pageSize = 10;
  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=${pageSize}&skip=${page * pageSize - pageSize}`,
    );
    const data = await res.json();
    setProducts(data.products || []);
    setTotalPage(data.total ? Math.ceil(data.total / pageSize) : 0);
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);
  return (
    <div>
      {products && (
        <div className="products">
          {products.length > 0 &&
            products.map((prd) => {
              return (
                <span className="products__single" key={prd.id}>
                  <img src={prd.thumbnail} alt={prd.title} />
                  <span>{prd.title}</span>
                </span>
              );
            })}
        </div>
      )}
      {products && products.length > 0 && (
        <Pagination
          products={products}
          totalPage={totalPage}
          page={page}
          setPage={setPage}
          maxVisible={10}
        />
      )}
    </div>
  );
};
export default App;
