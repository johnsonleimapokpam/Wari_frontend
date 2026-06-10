import ConversationItem from "./ConversationItem";

export default function ConversationList({
  conversations,
  loading,
  error,
  onSelect
}) {

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load</p>;
  }

  return (
    <div>
      {conversations.map(
        (conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            onSelect={onSelect}
          />
        )
      )}
    </div>
  );
}