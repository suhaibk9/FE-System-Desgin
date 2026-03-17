import { useState } from "react";
import Notification from "../Components/Notification";
import { v4 as uuidv4 } from "uuid";

const useNotfication = (postion = "top-right") => {
  const [notifications, setNotifications] = useState([]);
  const triggerNotification = (notificationProps) => {
    const toastId = uuidv4();
    setNotifications((prev) => [
      ...prev,
      { ...notificationProps, id: toastId },
    ]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== toastId));
    }, notificationProps.duration);
  };
  const handleClose = (uuid) => {
    setNotifications((prev) => prev.filter((n) => n.id !== uuid));
  };
  const NotificationComponent = (
    <div
      className={postion}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      {notifications?.map((noti) => (
        <Notification key={noti.id} {...noti} onClose={handleClose} />
      ))}
    </div>
  );
  return { NotificationComponent, triggerNotification };
};
export { useNotfication };
