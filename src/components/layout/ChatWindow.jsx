import { useEffect } from "react";

import { useSocket } from "../../context/SocketContext";

import useMessages from "../../hooks/useMessage";
import usePresence from "../../hooks/usePresence";

import MessageList from "../chat/MessageList";
import MessageInput from "../chat/MessageInput";

import PresenceBadge from "../presence/PresenceBadge";

export default function ChatWindow({
  conversation,
  setConversations
}) {

  const { socket } = useSocket();

  const {
    messages,
    setMessages,
    loading
  } = useMessages(
    conversation?.id
  );

  const presence = usePresence(
    conversation?.otherParticipant?.id
  );

  // Join conversation room
  useEffect(() => {

    if (!socket || !conversation) {
      return;
    }

    socket.emit(
      "join_conversation",
      {
        conversationId: conversation.id
      },
      (response) => {
        console.log(
          "Joined room",
          response
        );
      }
    );

  }, [socket, conversation]);

  // Receive new messages
  useEffect(() => {

    if (!socket) {
      return;
    }

    const handleMessage =
      (payload) => {

        console.log(
          "MESSAGE RECEIVED",
          payload
        );

        const message =
          payload.message;

        // Update open chat
        setMessages(
          (prev) => [
            ...prev,
            message
          ]
        );

        // Update sidebar preview
        setConversations(
          (prev) => {

            const updated =
              prev.map(
                (conversation) => {

                  if (
                    conversation.id ===
                    message.conversationId
                  ) {

                    return {
                      ...conversation,
                      lastMessage:
                        message
                    };
                  }

                  return conversation;
                }
              );

            // Move active conversation to top
            updated.sort(
              (a, b) =>
                new Date(
                  b.lastMessage?.createdAt || 0
                ) -
                new Date(
                  a.lastMessage?.createdAt || 0
                )
            );

            return updated;
          }
        );
      };

    socket.on(
      "message_received",
      handleMessage
    );

    return () => {

      socket.off(
        "message_received",
        handleMessage
      );
    };

  }, [
    socket,
    setMessages,
    setConversations
  ]);

  // Status updates
  useEffect(() => {

    if (!socket) {
      return;
    }

    const handleStatusUpdate =
      (payload) => {

        console.log(
          "STATUS UPDATE",
          payload
        );

      };

    socket.on(
      "message_status_updated",
      handleStatusUpdate
    );

    return () => {

      socket.off(
        "message_status_updated",
        handleStatusUpdate
      );
    };

  }, [socket]);

  const handleSendMessage =
    (body) => {

      if (!socket || !conversation) {
        return;
      }

      socket.emit(
        "send_message",
        {
          conversationId:
            conversation.id,
          body,
          clientMessageId:
            crypto.randomUUID()
        },
        (response) => {

          console.log(
            "SEND ACK",
            response
          );

         if (response?.success) {

            console.log(
              "Message persisted",
              response.message.id
            );

          }
        }
      );
    };

  if (!conversation) {

    return (
      <main className="chat-window">
        Select a conversation
      </main>
    );
  }

  return (
    <main className="chat-window">

      <div className="chat-header">

        <div>

          <h2>
            {
              conversation
                .otherParticipant
                .firstName
            }{" "}
            {
              conversation
                .otherParticipant
                .lastName
            }
          </h2>

          <PresenceBadge
            presence={presence}
          />

        </div>

      </div>

      {
        loading ? (
          <p>Loading...</p>
        ) : (
          <MessageList
            messages={messages}
          />
        )
      }

      <MessageInput
        onSend={
          handleSendMessage
        }
      />

    </main>
  );
}