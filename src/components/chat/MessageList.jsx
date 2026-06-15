import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

function groupByDate(messages) {
  const groups = [];
  let lastDate = null;
  for (const msg of messages) {
    const raw = msg.createdAt ? new Date(msg.createdAt) : new Date();
    const date = isNaN(raw)
      ? new Date().toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })
      : raw.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
    if (date !== lastDate) {
      groups.push({ type: "date", label: date });
      lastDate = date;
    }
    groups.push({ type: "message", msg });
  }
  return groups;
}

export default function MessageList({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const items = groupByDate(messages);

  return (
    <div className="message-list">
      {items.map((item, i) =>
        item.type === "date" ? (
          <div key={`date-${i}`} className="message-date-divider">{item.label}</div>
        ) : (
          <MessageBubble key={item.msg.id} message={item.msg} />
        )
      )}
      <div ref={bottomRef} />
    </div>
  );
}