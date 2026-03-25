import { useEffect, useRef, useState, type JSX } from "react";

//TImer With STart REset Pause
const Timer = (): JSX.Element => {
  const [time, setTime] = useState<number>(0);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const ref = useRef<number | null>(null);

  const startInterval = () => {
    clearInterval(ref.current ?? undefined);
    ref.current = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  };
  const closeInterval = () => {
    clearInterval(ref.current ?? undefined);
  };

  useEffect(() => {
    return () => clearInterval(ref.current ?? undefined);
  }, []);
  const handleStart = () => {
    startInterval();
    setTimerStarted(true);
  };
  const handlePause = () => {
    setIsPaused(true);
    closeInterval();
  };
  const handleContinue = () => {
    setIsPaused(false);
    startInterval();
  };
  const handleEnd = () => {
    closeInterval();
    setIsPaused(false);
    setTime(0);
    setTimerStarted(false);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>{time}</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {!timerStarted && (
            <button
              style={{
                padding: "10px",
                margin: "10px",
                background: "red",
                color: "white",
              }}
              onClick={handleStart}
            >
              Start
            </button>
          )}
          {timerStarted && time > 0 && !isPaused && (
            <button
              style={{
                padding: "10px",
                margin: "10px",
                background: "red",
                color: "white",
              }}
              onClick={handlePause}
            >
              Pause
            </button>
          )}
          {timerStarted && time > 0 && isPaused && (
            <button
              style={{
                padding: "10px",
                margin: "10px",
                background: "red",
                color: "white",
              }}
              onClick={handleContinue}
            >
              Continue
            </button>
          )}
          {timerStarted && time > 0 && (
            <button
              style={{
                padding: "10px",
                margin: "10px",
                background: "red",
                color: "white",
              }}
              onClick={handleEnd}
            >
              End
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default Timer;
