import React from "react";
import { useNotfication } from "../Hooks/useNotification";

const App: React.FC = () => {
  const { NotificationComponent, triggerNotification } =
    useNotfication("top-right");
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        padding: "20px",
      }}
    >
      <button
        onClick={() =>
          triggerNotification({
            type: "success",
            msg: "Successfully finished",
            duration: 30000,
            position: "top-right",
            animation: "slide",
          })
        }
      >
        Top Right (Success)
      </button>
      <button
        onClick={() =>
          triggerNotification({
            type: "error",
            msg: "Error occurred",
            duration: 30000,
            position: "top-right",
            animation: "fade",
          })
        }
      >
        Top Left (Error)
      </button>
      <button
        onClick={() =>
          triggerNotification({
            type: "warning",
            msg: "Warning occurred",
            duration: 30000,
            position: "top-right",
            animation: "pop",
          })
        }
      >
        Bottom Right (Warning)
      </button>
      <button
        onClick={() =>
          triggerNotification({
            type: "info",
            msg: "Info occurred",
            duration: 30000,
            position: "top-right",
            animation: "slide",
          })
        }
      >
        Bottom Left (Info)
      </button>

      {NotificationComponent}
    </div>
  );
}

export default App;
