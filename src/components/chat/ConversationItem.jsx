import usePresence from "../../hooks/usePresence";

const AVATAR_COLORS = ["av-purple", "av-teal"];

function getInitials(participant) {
  return `${participant?.firstName?.[0] ?? ""}${participant?.lastName?.[0] ?? ""}`.toUpperCase();
}

function getAvatarColor(id) {
  const num = id ? id.charCodeAt(0) : 0;
  return AVATAR_COLORS[num % AVATAR_COLORS.length];
}

function formatTime(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now - date) / 86400000);
  if (diffDays === 0) return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return date.toLocaleDateString([], { weekday: "short" });
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

export default function ConversationItem({ conversation, onSelect, isActive }) {
  const participant = conversation.otherParticipant;
  const presence = usePresence(participant?.id);

  return (
    <div
      className={`conversation-item ${isActive ? "active" : ""}`}
      onClick={() => onSelect(conversation)}
    >
      <div className="conv-avatar-wrap">
        <div className={`conv-avatar ${getAvatarColor(participant?.id)}`}>
          {getInitials(participant)}
        </div>
        {presence?.isOnline && <span className="online-dot" aria-label="Online" />}
      </div>

      <div className="conv-info">
        <div className="conv-name">
          {participant?.firstName} {participant?.lastName}
        </div>
        <div className="conv-preview">
          {conversation.lastMessage?.body || "No messages yet"}
        </div>
      </div>

      <div className="conv-meta">
        <span className="conv-time">
          {formatTime(conversation.lastMessage?.createdAt)}
        </span>
      </div>
    </div>
  );
}