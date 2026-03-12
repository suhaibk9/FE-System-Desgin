import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const Carousel = ({
  images,
  isLoading,
  imageLimit = images.length - 1,
  LoadingComponent = null,
  customPrevButton = null,
  customNextButton = null,
  imagesPerSlide = 2,
}) => {
  const imgRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState();
  const [imgWidth, setImgWidth] = useState(0);
  const goToNext = () =>
    setCurrentIdx((curr) => {
      if (curr === images.length - 1) return 0;
      else return curr + 1;
    });
  const goToPrev = () =>
    setCurrentIdx((curr) => {
      if (curr === 0) return images.length;
      else return curr - 1;
    });

  useEffect(() => {
    if (images.length > 0) setCurrentIdx(0);
  }, [images]);
  if (isLoading) return LoadingComponent ? <LoadingComponent /> : null;

  return (
    <div className="carousel" style={{ width: imagesPerSlide * imgWidth }}>
      <div
        className="image-container"
        style={{
          transform: `translateX(-${currentIdx * imgWidth}px)`,
          transition: "transform 0.4s ease-in-out",
        }}
      >
        {images
          .slice(0, imageLimit > images.length ? images.length : imageLimit)
          .map((img) => {
            return (
              <img
                key={img.id}
                src={img.url}
                alt={img.title}
                className="image"
                ref={imgRef}
                onLoad={() => setImgWidth(imgRef?.current?.offsetWidth)}
              />
            );
          })}
      </div>
      {customPrevButton ? (
        customPrevButton(goToPrev)
      ) : (
        <button className="prev btn" onClick={goToPrev}>
          Prev
        </button>
      )}
      {customNextButton ? (
        customNextButton(goToNext)
      ) : (
        <button className="next btn" onClick={goToNext}>
          Next
        </button>
      )}
    </div>
  );
};
export default Carousel;
