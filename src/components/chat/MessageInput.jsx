import { useEffect, useRef, useState } from "react";
import { SendIcon } from "../ui/Icons";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    input.style.height = "auto";
    input.style.height = `${Math.min(input.scrollHeight, 132)}px`;
  }, [text]);

  const submit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit(event);
    }
  };

  const canSend = text.trim().length > 0;

  return (
    <form className="message-input-area" onSubmit={submit}>
      <div className="message-input-inner">
        <textarea
          ref={inputRef}
          className="message-input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write a message…"
          aria-label="Write a message"
          autoComplete="off"
          enterKeyHint="send"
          rows={1}
        />
        <button
          className="send-btn"
          type="submit"
          aria-label="Send message"
          title="Send message"
          disabled={!canSend}
        >
          <SendIcon size={18} />
        </button>
      </div>
    </form>
  );
}
