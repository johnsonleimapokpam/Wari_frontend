import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ConversationList from "../chat/ConversationList";
import UserSearchModal from "../users/userSearchModal";
import { ComposeIcon, LogOutIcon, SearchIcon } from "../ui/Icons";
import { getAvatarClass, getInitials } from "../../utils/user";

export default function Sidebar({ conversations, loading, error, onSelect, selectedId, className }) {
  const { user, logout } = useAuth();
  const [showSearch, setShowSearch] = useState(false);
  const [filter, setFilter] = useState("");

  const filtered = filter.trim()
    ? conversations.filter((conversation) => {
        const name = `${conversation.otherParticipant?.firstName ?? ""} ${conversation.otherParticipant?.lastName ?? ""}`.toLowerCase();
        return name.includes(filter.toLowerCase());
      })
    : conversations;

  return (
    <aside className={`sidebar ${className ?? ""}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-brand">
          <span>Wari</span>
          <span className="brand-dot" aria-hidden="true" />
        </h2>

        <div className="sidebar-header-actions">
          <button
            className="icon-btn"
            type="button"
            onClick={() => setShowSearch(true)}
            title="New conversation"
            aria-label="New conversation"
          >
            <ComposeIcon />
          </button>
        </div>
      </div>

      <div className="sidebar-search">
        <div className="sidebar-search-wrap">
          <span className="search-icon">
            <SearchIcon size={17} />
          </span>
          <input
            type="search"
            aria-label="Search conversations"
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
        <div className={`my-avatar ${getAvatarClass(user?.id || user?.email || "")}`}>
          {getInitials(user)}
        </div>
        <span className="my-name">{user?.firstName} {user?.lastName}</span>
        <button
          className="logout-btn"
          type="button"
          onClick={logout}
          title="Sign out"
          aria-label="Sign out"
        >
          <LogOutIcon size={18} />
        </button>
      </div>

      {showSearch && (
        <UserSearchModal
          onClose={() => setShowSearch(false)}
          onConversationCreated={(conversation) => {
            onSelect(conversation);
            setShowSearch(false);
          }}
        />
      )}
    </aside>
  );
}
