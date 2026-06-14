import { useState } from "react";
import api from "../../api/axios";

const AVATAR_COLORS = ["av-purple", "av-teal"];
function getInitials(u) {
  return `${u?.firstName?.[0] ?? ""}${u?.lastName?.[0] ?? ""}`.toUpperCase();
}
function getAvatarColor(id) {
  return AVATAR_COLORS[(id?.charCodeAt(0) ?? 0) % AVATAR_COLORS.length];
}

export default function UserSearchModal({ onClose, onConversationCreated }) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value) => {
    setQuery(value);
    if (!value.trim()) { setUsers([]); return; }
    try {
      setLoading(true);
      const response = await api.get(`/users/search?q=${value}`);
      setUsers(response.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startConversation = async (participantId) => {
    try {
      const response = await api.post("/conversations", { participantId });
      onConversationCreated(response.data.data);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2>New conversation</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by name or email…"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            autoFocus
          />
        </div>

        {loading && <div className="modal-searching">Searching…</div>}

        {!loading && query && users.length === 0 && (
          <div className="modal-empty">No users found</div>
        )}

        {users.map((user) => (
          <div
            key={user.id}
            className="user-item"
            onClick={() => startConversation(user.id)}
          >
            <div className={`conv-avatar ${getAvatarColor(user.id)}`}>
              {getInitials(user)}
            </div>
            <div className="user-item-info">
              <div className="user-item-name">{user.firstName} {user.lastName}</div>
              <div className="user-item-email">{user.email}</div>
            </div>
            <span className="user-item-action">Chat →</span>
          </div>
        ))}
      </div>
    </div>
  );
}
