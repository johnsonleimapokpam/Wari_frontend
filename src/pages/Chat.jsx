import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import ChatWindow from "../components/layout/ChatWindow";
import useConversations from "../hooks/useConversations";

export default function Chat() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const { conversations, setConversations, loading, error } = useConversations();

  const handleSelect = (conversation) => {
    setSelectedConversation(conversation);
    setShowChat(true);
  };

  const handleBack = () => {
    setShowChat(false);
  };

  return (
    <div className="chat-layout">
      <Sidebar
        conversations={conversations}
        loading={loading}
        error={error}
        onSelect={handleSelect}
        selectedId={selectedConversation?.id}
        className={showChat ? "hidden" : ""}
      />
      <ChatWindow
        conversation={selectedConversation}
        setConversations={setConversations}
        onBack={handleBack}
        className={showChat ? "visible" : ""}
      />
    </div>
  );
}