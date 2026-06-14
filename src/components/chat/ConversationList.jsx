import ConversationItem from "./ConversationItem";

export default function ConversationList({ conversations, loading, error, onSelect, selectedId }) {
  if (loading) {
    return (
      <div style={{ padding: "1.5rem", textAlign: "center", fontSize: "13px", color: "var(--text-tertiary)" }}>
        Loading conversations…
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "1.5rem", textAlign: "center", fontSize: "13px", color: "#A32D2D" }}>
        Failed to load conversations
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div style={{ padding: "1.5rem", textAlign: "center", fontSize: "13px", color: "var(--text-tertiary)" }}>
        No conversations yet
      </div>
    );
  }

  return (
    <div className="conversation-list">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          onSelect={onSelect}
          isActive={conversation.id === selectedId}
        />
      ))}
    </div>
  );
}