import { useAuth } from "../../context/AuthContext"

export default function MessageBubble({ message }){

    const { user } = useAuth();
    const isMine = message.senderId === user?.id

    console.log(
  "message.senderId:",
  message.senderId
);

console.log(
  "user",
  user
);

console.log(
  "isMine:",
  message.senderId === user?.id
);

   return (
    <div className={ isMine ? "my-message" : "other-message"}>
      <p>
        {message.body}
      </p>

      <small>
        {new Date(message.createdAt).toLocaleTimeString()}
      </small>
    </div>
  );
}