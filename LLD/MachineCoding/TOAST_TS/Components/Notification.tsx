import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import "./Notification.css";
export interface NotificationProps {
  type?: "success" | "error" | "warning" | "info";
  msg?: string;
  animation?: "fade" | "pop" | "slide";
  onClose?: (id: string) => void;
  id?: string;
}

const iconStyle = { marginRight: "10px" };
const icons: Record<NonNullable<NotificationProps["type"]>, React.ReactNode> = {
  success: <AiOutlineCheckCircle style={iconStyle} />,
  error: <AiOutlineCloseCircle style={iconStyle} />,
  warning: <AiOutlineExclamationCircle style={iconStyle} />,
  info: <AiOutlineInfoCircle style={iconStyle} />,
};
const animations: Record<NonNullable<NotificationProps["animation"]>, string> = {
  fade: "fadeIn",
  pop: "popUp",
  slide: "slideIn",
};
const Notification = ({
  type = "info",
  msg = "Important Information",
  animation = "slide",
  onClose,
  id,
}: NotificationProps) => {
  return (
    <div className={`notification ${type} ${animations[animation]}`}>
      {/* Icon */}
      {icons[type]}
      {/* Message */}
      {msg}
      {/* Close Button */}
      <div
        onClick={() => onClose?.(id!)}
        className="close-btn"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onClose?.(id!);
          }
        }}
      >
        X
      </div>
    </div>
  );
};
export default Notification;
