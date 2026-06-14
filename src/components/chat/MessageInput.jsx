import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit(e);
    }
  };

  return (
    <form className="message-input-area" onSubmit={submit}>
      <button type="button" className="attach-btn" aria-label="Attach file">📎</button>
      <input
        className="message-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message…"
        autoComplete="off"
      />
      <button className="send-btn" type="submit" aria-label="Send message">➤</button>
    </form>
  );
}