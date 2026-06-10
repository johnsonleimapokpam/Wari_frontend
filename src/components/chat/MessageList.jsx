import MessageBubble from "./MessageBubble"

export default function MessageList({ messages }){
    return(
        <div className="message-list">
            {messages.map((message) => (
                <MessageBubble 
                    key={message.id}
                    message={message}
                />
            ))}
        </div>
    )
}