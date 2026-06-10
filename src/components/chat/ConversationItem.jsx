import usePresence from "../../hooks/usePresence";
import PresenceBadge from "../presence/PresenceBadge";

export default function ConversationItem({ conversation, onSelect }) {

  const participant = conversation.otherParticipant;

  const presence = usePresence(conversation.otherParticipant.id);

  return (
    <div
      className="conversation-item"
      onClick={() =>
        onSelect(conversation)
      }
    >
      <h4>
        {participant.firstName}
        {" "}
        {participant.lastName}
      </h4>

      <p>
        {
          conversation.lastMessage?.body ||
          "No messages yet"
        }
      </p>
    </div>
  );
}