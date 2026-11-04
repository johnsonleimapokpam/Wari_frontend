import ConversationItem from "./ConversationItem";

function ConversationSkeleton() {
  return (
    <div className="conversation-skeleton" aria-hidden="true">
      <div className="skeleton-avatar" />
      <div className="skeleton-lines">
        <div className="skeleton-line" />
        <div className="skeleton-line short" />
      </div>
    </div>
  );
}

export default function ConversationList({ conversations, loading, error, onSelect, selectedId }) {
  if (loading) {
    return (
      <div className="conversation-list" aria-busy="true" aria-label="Loading conversations">
        {Array.from({ length: 5 }, (_, index) => (
          <ConversationSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="conversation-state error" role="alert">
        <strong>Couldn&apos;t load conversations.</strong>
        Check your connection and refresh the page.
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="conversation-state">
        <strong>No conversations yet.</strong>
        Use the pen button to find someone and start a thread.
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
