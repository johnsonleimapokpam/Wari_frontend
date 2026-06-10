import ConversationList from "../chat/ConversationList";
import { useAuth } from "../../context/AuthContext";
import UserSearchModal from "../users/userSearchModal";
import { useState } from "react";

export default function Sidebar({
  conversations,
  loading,
  error,
  onSelect
}) {

  const { logout } = useAuth();

  const [showSearch, setShowSearch] = useState(false);

  return (
    <aside className="sidebar">

      <h2>Chats</h2>

      <button onClick={() => setShowSearch(true)}> +New Chat</button>
      
      <button onClick={logout}>
        Logout
      </button>

      <ConversationList
        conversations={conversations}
        loading={loading}
        error={error}
        onSelect={onSelect}
      />

      {
        showSearch && (
          <UserSearchModal
            onClose={() =>
              setShowSearch(false)
            }
            onConversationCreated={
              onSelect
            }
          />
        )
      }

    </aside>
  );
}