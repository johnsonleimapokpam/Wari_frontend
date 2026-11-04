import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import api from "../../api/axios";
import { ChevronRightIcon, CloseIcon, SearchIcon } from "../ui/Icons";
import { getAvatarClass, getInitials } from "../../utils/user";

export default function UserSearchModal({ onClose, onConversationCreated }) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    inputRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onCloseRef.current();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearch = async (value) => {
    setQuery(value);
    if (!value.trim()) {
      setUsers([]);
      return;
    }

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

  return createPortal(
    <div className="modal-overlay" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="new-conversation-title">
        <div className="modal-header">
          <h2 id="new-conversation-title">New conversation</h2>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close">
            <CloseIcon size={18} />
          </button>
        </div>

        <div className="modal-search">
          <span className="search-icon">
            <SearchIcon size={18} />
          </span>
          <input
            ref={inputRef}
            type="search"
            aria-label="Search people by name or email"
            placeholder="Search by name or email"
            value={query}
            onChange={(event) => handleSearch(event.target.value)}
          />
        </div>

        <div className="modal-results">
          {loading && <div className="modal-searching" role="status">Searching…</div>}

          {!loading && !query && (
            <div className="modal-empty">Search for someone by name or email.</div>
          )}

          {!loading && query && users.length === 0 && (
            <div className="modal-empty">No people found. Try a different name or email.</div>
          )}

          {users.map((user) => {
            const displayName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.email;

            return (
              <button
                key={user.id}
                className="user-item"
                type="button"
                onClick={() => startConversation(user.id)}
                aria-label={`Start a conversation with ${displayName}`}
              >
                <div className={`conv-avatar ${getAvatarClass(user.id || displayName)}`}>
                  {getInitials(user)}
                </div>
                <div className="user-item-info">
                  <div className="user-item-name">{displayName}</div>
                  <div className="user-item-email">{user.email}</div>
                </div>
                <span className="user-item-action">
                  Chat
                  <ChevronRightIcon size={16} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}
