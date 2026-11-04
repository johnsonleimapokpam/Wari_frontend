import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import useMessages from "../../hooks/useMessage";
import usePresence from "../../hooks/usePresence";
import MessageList from "../chat/MessageList";
import MessageInput from "../chat/MessageInput";
import PresenceBadge from "../presence/PresenceBadge";
import { ChevronLeftIcon, MessageIcon } from "../ui/Icons";
import { getAvatarClass, getInitials } from "../../utils/user";

export default function ChatWindow({ conversation, setConversations, onBack, className }) {
  const { socket } = useSocket();
  const { messages, setMessages, loading } = useMessages(conversation?.id);
  const presence = usePresence(conversation?.otherParticipant?.id);
  const [typingUser, setTypingUser] = useState(null);

  useEffect(() => {
    if (!socket || !conversation) return;
    socket.emit("join_conversation", { conversationId: conversation.id });
  }, [socket, conversation]);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (payload) => {
      const message = payload.message;
      setMessages((prev) => [...prev, message]);
      setConversations((prev) => {
        const updated = prev.map((item) =>
          item.id === message.conversationId ? { ...item, lastMessage: message } : item
        );
        updated.sort((a, b) =>
          new Date(b.lastMessage?.createdAt || 0) - new Date(a.lastMessage?.createdAt || 0)
        );
        return updated;
      });
    };

    const handleTyping = (payload) => {
      if (payload.conversationId === conversation?.id) {
        setTypingUser(payload.isTyping ? payload.userId : null);
      }
    };

    socket.on("message_received", handleMessage);
    socket.on("typing_update", handleTyping);

    return () => {
      socket.off("message_received", handleMessage);
      socket.off("typing_update", handleTyping);
    };
  }, [socket, conversation, setMessages, setConversations]);

  const handleSendMessage = (body) => {
    if (!socket || !conversation) return;
    socket.emit("send_message", {
      conversationId: conversation.id,
      body,
      clientMessageId: crypto.randomUUID(),
    });
  };

  if (!conversation) {
    return (
      <main className={`chat-window-empty ${className ?? ""}`}>
        <div className="chat-window-empty-icon" aria-hidden="true">
          <MessageIcon size={24} />
        </div>
        <h2>Pick a conversation.</h2>
        <p>Your threads are on the left. Start a new one with the pen button.</p>
      </main>
    );
  }

  const participant = conversation.otherParticipant;
  const displayName = `${participant?.firstName ?? ""} ${participant?.lastName ?? ""}`.trim() || "Unknown person";

  return (
    <main className={`chat-window ${className ?? ""}`}>
      <header className="chat-header">
        <div className="chat-header-inner">
          <button
            className="chat-back-btn"
            type="button"
            onClick={onBack}
            aria-label="Back to conversations"
          >
            <ChevronLeftIcon size={20} />
          </button>

          <div className={`conv-avatar chat-header-avatar ${getAvatarClass(participant?.id || displayName)}`}>
            {getInitials(participant)}
          </div>

          <div className="chat-header-info">
            <div className="chat-header-name">{displayName}</div>
            <PresenceBadge presence={presence} />
          </div>
        </div>
      </header>

      {loading ? (
        <div className="chat-loading" aria-busy="true" aria-label="Loading messages">
          <div className="chat-loading-inner">
            <div className="message-skeleton theirs" />
            <div className="message-skeleton theirs short" />
            <div className="message-skeleton mine" />
            <div className="message-skeleton mine short" />
            <div className="message-skeleton theirs" />
          </div>
        </div>
      ) : (
        <MessageList messages={messages} />
      )}

      {typingUser && (
        <div className="typing-indicator" role="status" aria-live="polite">
          <div className="typing-dots" aria-hidden="true">
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
          </div>
          {participant?.firstName} is typing…
        </div>
      )}

      <MessageInput onSend={handleSendMessage} />
    </main>
  );
}
