import { useState } from "react";
import "./App.css";
import StarRating from "./StarRating";

const App = () => {
  const [val, setVal] = useState(3);
const handleRatingChange=(newRating)=>{
  setVal(newRating)
}
  return (
    <div>
      <StarRating size={10} rating={val} onChange={handleRatingChange}/>
      <p className="current-rating">Current Rating :{val}★</p>
    </div>
  );
};

export default App;
