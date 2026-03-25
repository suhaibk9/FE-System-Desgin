import { useState } from "react";
import Notification, { NotificationProps } from "../Components/Notification";
import { v4 as uuidv4 } from "uuid";

export interface ToastProps extends NotificationProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  duration: number;
}

const useNotfication = (postion: string = "top-right") => {
  const [notifications, setNotifications] = useState<ToastProps[]>([]);
  const triggerNotification = (notificationProps: ToastProps) => {
    const toastId = uuidv4();
    setNotifications((prev) => [
      ...prev,
      { ...notificationProps, id: toastId },
    ]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== toastId));
    }, notificationProps.duration);
  };
  const handleClose = (uuid: string) => {
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
