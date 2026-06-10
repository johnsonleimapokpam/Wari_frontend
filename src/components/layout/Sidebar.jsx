import ConversationList from "../chat/ConversationList";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({
  conversations,
  loading,
  error,
  onSelect
}) {

  const { logout } = useAuth();

  return (
    <aside className="sidebar">

      <h2>Chats</h2>

      <button onClick={logout}>
        Logout
      </button>

      <ConversationList
        conversations={conversations}
        loading={loading}
        error={error}
        onSelect={onSelect}
      />

    </aside>
  );
}