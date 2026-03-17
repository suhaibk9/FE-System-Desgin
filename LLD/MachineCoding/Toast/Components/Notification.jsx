import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineExclamationCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import "./Notification.css";
const iconStyle = { marginRight: "10px" };
const icons = {
  success: <AiOutlineCheckCircle style={iconStyle} />,
  error: <AiOutlineCloseCircle style={iconStyle} />,
  warning: <AiOutlineExclamationCircle style={iconStyle} />,
  info: <AiOutlineInfoCircle style={iconStyle} />,
};
const animations = {
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
}) => {
  return (
    <div className={`notification ${type} ${animations[animation]}`}>
      {/* Icon */}
      {icons[type]}
      {/* Message */}
      {msg}
      {/* Close Button */}
      <div onClick={() => onClose(id)} className="close-btn">
        X
      </div>
    </div>
  );
};
export default Notification;
