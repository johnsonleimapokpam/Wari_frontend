import Sidebar from "../components/layout/Sidebar";
import ChatWindow from "../components/layout/ChatWindow";

import { useState } from "react";

import useConversations
from "../hooks/useConversations";

export default function Chat() {

  const [
    selectedConversation,
    setSelectedConversation
  ] = useState(null);

  const {
    conversations,
    setConversations,
    loading,
    error
  } = useConversations();

  return (
    <div className="chat-layout">

      <Sidebar
        conversations={conversations}
        loading={loading}
        error={error}
        onSelect={
          setSelectedConversation
        }
      />

      <ChatWindow
        conversation={
          selectedConversation
        }

        setConversations={
          setConversations
        }
      />

    </div>
  );
}