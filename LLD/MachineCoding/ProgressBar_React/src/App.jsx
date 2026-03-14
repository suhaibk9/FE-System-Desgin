import ProgressBar from "./ProgressBar";
import "./App.css";
import { useState, useRef } from "react";
import { useEffect } from "react";
const App = () => {
  const [val, setVal] = useState(0);
  const interValRef = useRef(null);
  useEffect(() => {
    interValRef.current = setInterval(() => {
      setVal((prevVal) => {
        if (prevVal === 100) {
          clearInterval(interValRef.current);
          return prevVal;
        }
        return prevVal + 1;
      });
    }, 500);

    return () => clearInterval(interValRef.current);
  }, []);
  return (
    <div className="app">
      <h1>ProgressBar</h1>
      <ProgressBar value={val} />
    </div>
  );
};
export default App;
