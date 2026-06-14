import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ConversationList from "../chat/ConversationList";
import UserSearchModal from "../users/userSearchModal";

function getInitials(user) {
  if (!user) return "?";
  return `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();
}

export default function Sidebar({ conversations, loading, error, onSelect, selectedId }) {
  const { user, logout } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [filter, setFilter] = useState("");

  const filtered = filter.trim()
    ? conversations.filter((c) => {
        const name = `${c.otherParticipant?.firstName ?? ""} ${c.otherParticipant?.lastName ?? ""}`.toLowerCase();
        return name.includes(filter.toLowerCase());
      })
    : conversations;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Wari</h2>
        <div className="sidebar-header-actions">
          <button className="icon-btn" onClick={() => setShowSearch(true)} title="New chat" aria-label="New chat">
            ✏️
          </button>
        </div>
      </div>

      <div className="sidebar-search">
        <div className="sidebar-search-wrap">
          <span className="search-icon">🔍</span>
          <input
            placeholder="Search conversations"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      <ConversationList
        conversations={filtered}
        loading={loading}
        error={error}
        onSelect={onSelect}
        selectedId={selectedId}
      />

      <div className="sidebar-footer">
        <div className="my-avatar">{getInitials(user)}</div>
        <span className="my-name">{user?.firstName} {user?.lastName}</span>
        <button className="logout-btn" onClick={logout} title="Sign out" aria-label="Sign out">
          ↩
        </button>
      </div>

      {showSearch && (
        <UserSearchModal
          onClose={() => setShowSearch(false)}
          onConversationCreated={(conv) => {
            onSelect(conv);
            setShowSearch(false);
          }}
        />
      )}
    </aside>
  );
}