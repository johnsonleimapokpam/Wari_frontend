import { useAuth } from "../../context/AuthContext";

function formatTime(dateStr) {
  const date = dateStr ? new Date(dateStr) : new Date();
  if (isNaN(date)) return "";
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function MessageBubble({ message }) {
  const { user } = useAuth();
  const isMine = message.senderId === user?.id;

  return (
    <div className={`message-bubble-wrap ${isMine ? "my-message" : "other-message"}`}>
      <div className="bubble">
        {message.body}
      </div>
      <div className="bubble-meta">
        {formatTime(message.createdAt)}
        {isMine && (
          <span className="read-tick" aria-label={message.status}>✓✓</span>
        )}
      </div>
    </div>
  );
}