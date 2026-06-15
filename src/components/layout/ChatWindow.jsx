import { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketContext";
import useMessages from "../../hooks/useMessage";
import usePresence from "../../hooks/usePresence";
import MessageList from "../chat/MessageList";
import MessageInput from "../chat/MessageInput";
import PresenceBadge from "../presence/PresenceBadge";

const AVATAR_COLORS = ["av-purple", "av-teal"];
function getInitials(p) {
  return `${p?.firstName?.[0] ?? ""}${p?.lastName?.[0] ?? ""}`.toUpperCase();
}
function getAvatarColor(id) {
  return AVATAR_COLORS[(id?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length];
}

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
        const updated = prev.map((c) =>
          c.id === message.conversationId ? { ...c, lastMessage: message } : c
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
        <div className="chat-window-empty-icon">💬</div>
        <p>Select a conversation to start chatting</p>
      </main>
    );
  }

  const participant = conversation.otherParticipant;

  return (
    <main className={`chat-window ${className ?? ""}`}>
      <div className="chat-header">
        {/* Back button — only visible on mobile via CSS */}
        <button className="chat-back-btn" onClick={onBack} aria-label="Back to conversations">
          ‹
        </button>

        <div
          className={`conv-avatar ${getAvatarColor(participant?.id)}`}
          style={{ width: 36, height: 36, fontSize: 13 }}
        >
          {getInitials(participant)}
        </div>

        <div className="chat-header-info">
          <div className="chat-header-name">
            {participant?.firstName} {participant?.lastName}
          </div>
          <PresenceBadge presence={presence} />
        </div>
      </div>

      {loading ? (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "var(--text-tertiary)" }}>
          Loading messages…
        </div>
      ) : (
        <MessageList messages={messages} />
      )}

      {typingUser && (
        <div className="typing-indicator">
          <div className="typing-dots">
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