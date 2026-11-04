import usePresence from "../../hooks/usePresence";
import { getAvatarClass, getInitials } from "../../utils/user";
import { formatConversationTime } from "../../utils/formatTime";

export default function ConversationItem({ conversation, onSelect, isActive }) {
  const participant = conversation.otherParticipant;
  const presence = usePresence(participant?.id);
  const displayName = `${participant?.firstName ?? ""} ${participant?.lastName ?? ""}`.trim() || "Unknown person";

  return (
    <button
      type="button"
      className={`conversation-item ${isActive ? "active" : ""}`}
      onClick={() => onSelect(conversation)}
      aria-current={isActive ? "true" : undefined}
      aria-label={`Open conversation with ${displayName}`}
    >
      <div className="conv-avatar-wrap">
        <div className={`conv-avatar ${getAvatarClass(participant?.id || displayName)}`}>
          {getInitials(participant)}
        </div>
        {presence?.isOnline && <span className="online-dot" aria-label="Online" />}
      </div>

      <div className="conv-info">
        <div className="conv-name">{displayName}</div>
        <div className="conv-preview">
          {conversation.lastMessage?.body || "No messages yet"}
        </div>
      </div>

      <div className="conv-meta">
        <span className="conv-time">
          {formatConversationTime(conversation.lastMessage?.createdAt)}
        </span>
      </div>
    </button>
  );
}
