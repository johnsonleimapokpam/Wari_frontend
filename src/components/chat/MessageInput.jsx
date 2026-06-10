import { useState } from "react";

export default function MessageInput({
  onSend
}) {

  const [text, setText] =
    useState("");

  const submit = (e) => {

    e.preventDefault();

    if (!text.trim()) {
      return;
    }

    onSend(text);

    setText("");
  };

  return (
    <form onSubmit={submit}>
      <input
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <button type="submit">
        Send
      </button>
    </form>
  );
}