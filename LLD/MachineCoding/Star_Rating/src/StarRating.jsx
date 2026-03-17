import { useState } from "react";

const StarRating = ({ rating, size, onChange }) => {
  const [currStar, setCurrStar] = useState(0);
  const handleMouseEnter = (hoverRating) => {
    setCurrStar(hoverRating);
  };
  const handleMouseLeave = () => {
    setCurrStar(0);
  };
  return (
    <div className="star-rating">
      {Array(size)
        .fill("")
        .map((_, idx) => {
          let starClass = "star";
          return (
            <span
              onMouseEnter={() => handleMouseEnter(idx + 1)}
              onMouseLeave={() => handleMouseLeave(idx + 1)}
              key={idx}
              className={starClass}
              onClick={() => onChange(idx + 1)}
            >
              {currStar >= idx + 1 || rating >= idx + 1 ? "★" : "✩"}
            </span>
          );
        })}
    </div>
  );
};
export default StarRating;
