import { useState } from "react";
import Carousel from "./Carousel";
import { useEffect } from "react";
import './App.css'
const Loading = () => <div>Loading....</div>;
const App = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const fetchPhotos = async (limit) => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/photos?_limit=" + limit,
      );
      const data = await res.json();
      const newData = data.map((img) => {
        return { ...img, url: `https://picsum.photos/400?random=${img.id}` };
      });
      console.log("data", data);
      setImages(newData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPhotos(9);
  }, []);
  useEffect(() => {});
  return (
    <div className="carousel-container">
      {/* imageLimit={} customPrevButton={} customNextButton={} imagesPerSlide={}*/}
      <Carousel
        images={images}
        isLoading={loading}
        LoadingComponent={Loading}
        imageLimit={10}
        imagesPerSlide={2}
        customPrevButton={(onClick) => (
          <button className="prev btn custom" onClick={onClick}>
            ⏪ Custom Prev
          </button>
        )}
        customNextButton={(onClick) => (
          <button className="next btn custom" onClick={onClick}>
            Custom Next ⏩
          </button>
        )}
      />
    </div>
  );
};
export default App;
