import { useEffect, useState, useCallback } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    // Prevent fetching if already loading
    if (loading) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${page * 10}`,
      );
      const data = await res.json();
      setProducts(data);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [loading, page]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const throttle = (cb, delay = 1000) => {
    let lastTimeCalled = 0;
    return (...args) => {
      let now = new Date().getTime();
      if (now - lastTimeCalled < delay) return;
      lastTimeCalled = now;
      return cb(...args);
    };
  };
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 500 >=
        document.body.offsetHeight
      ) {
        // Trigger fetch only if NOT currently loading
        if (!loading && products.limit < products.total) {
          fetchProducts();
        }
      }
    }, 250);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page]);

  const { products: data } = products;

  return (
    <>
      <div>Infinite Scroll</div>
      <div className="products">
        {data?.map((prd) => {
          return (
            <div className="products__single" key={prd.id}>
              <img src={prd.thumbnail} alt={prd.title} />
              <span>{prd.title}</span>
            </div>
          );
        })}
      </div>
      {loading && <div>Loading more products...</div>}
    </>
  );
};
export default App;
