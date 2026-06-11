import { useState } from "react";

import api from "../../api/axios";

export default function UserSearchModal({
  onClose,
  onConversationCreated
}) {

  const [query, setQuery] =
    useState("");

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const handleSearch =
    async (value) => {

      setQuery(value);

      if (!value.trim()) {
        setUsers([]);
        return;
      }

      try {

        setLoading(true);

        const response =
          await api.get(
            `/users/search?q=${value}`
          );

          console.log(response);

        setUsers(
          response.data.data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  const startConversation =
    async (participantId) => {

      try {

        const response =
          await api.post(
            "/conversations/direct",
            {
              participantId
            }
          );

        const conversation =
          response.data.data;

        onConversationCreated(
          conversation
        );

        onClose();

      } catch (error) {

        console.error(error);

      }
    };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>
          Start New Chat
        </h2>

        <input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) =>
            handleSearch(
              e.target.value
            )
          }
        />

        {loading && (
          <p>Searching...</p>
        )}

        {users.map((user) => (

          <div
            key={user.id}
            className="user-item"
            onClick={() =>
              startConversation(
                user.id
              )
            }
          >

            <h4>
              {user.firstName}
              {" "}
              {user.lastName}
            </h4>

            <p>
              {user.email}
            </p>

          </div>

        ))}

        <button
          onClick={onClose}
        >
          Close
        </button>

      </div>

    </div>
  );
}