import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

function groupByDate(messages) {
  const groups = [];
  let lastDate = null;
  let previousMessage = null;

  for (const message of messages) {
    const raw = message.createdAt ? new Date(message.createdAt) : new Date();
    const date = Number.isNaN(raw.getTime())
      ? new Date().toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })
      : raw.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });

    if (date !== lastDate) {
      groups.push({ type: "date", label: date });
      lastDate = date;
      previousMessage = null;
    }

    const grouped =
      previousMessage !== null &&
      previousMessage.senderId === message.senderId &&
      Math.abs(new Date(message.createdAt) - new Date(previousMessage.createdAt)) < 5 * 60 * 1000;

    groups.push({ type: "message", message, grouped });
    previousMessage = message;
  }

  return groups;
}

export default function MessageList({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    bottomRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  }, [messages]);

  const items = groupByDate(messages);

  return (
    <div
      className="message-list"
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      aria-label="Messages"
    >
      <div className="message-list-inner">
        {items.map((item, index) =>
          item.type === "date" ? (
            <div key={`date-${index}`} className="message-date-divider">{item.label}</div>
          ) : (
            <MessageBubble
              key={item.message.id}
              message={item.message}
              grouped={item.grouped}
            />
          )
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
