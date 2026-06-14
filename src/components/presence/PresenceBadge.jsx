import formatLastSeen from "../../utils/formatLastSeen";

export default function PresenceBadge({ presence }) {
  if (!presence) return null;

  if (presence.isOnline) {
    return (
      <div className="chat-header-status">
        <span className="status-dot online" />
        <span className="status-text online">Online</span>
      </div>
    );
  }

  return (
    <div className="chat-header-status">
      <span className="status-dot offline" />
      <span className="status-text offline">
        {presence.lastSeen ? `Last seen ${formatLastSeen(presence.lastSeen)}` : "Offline"}
      </span>
    </div>
  );
}