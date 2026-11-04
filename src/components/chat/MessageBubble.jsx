import { useAuth } from "../../context/AuthContext";
import { CheckCheckIcon } from "../ui/Icons";
import { formatClock } from "../../utils/formatTime";

export default function MessageBubble({ message, grouped = false }) {
  const { user } = useAuth();
  const isMine = message.senderId === user?.id;

  return (
    <div className={`message-bubble-wrap ${isMine ? "my-message" : "other-message"} ${grouped ? "is-grouped" : ""}`}>
      <div className="bubble">{message.body}</div>
      <div className="bubble-meta">
        <span>{formatClock(message.createdAt)}</span>
        {isMine && (
          <span className="read-tick" aria-label={message.status || "Sent"} title={message.status || "Sent"}>
            <CheckCheckIcon size={14} />
          </span>
        )}
      </div>
    </div>
  );
}
