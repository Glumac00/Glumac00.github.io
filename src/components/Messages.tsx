type MessageType = {
  member: {
    id: string;
    clientData: {
      color: string;
      username: string;
    };
  };
  text: string;
};

type MessagesProps = {
  messages: MessageType[];
  currentMember: {
    id: string;
    username: string;
    color: string;
  };
};

const Messages = ({ messages, currentMember }: MessagesProps) => {
  console.log("Received messages:", messages);
  return (
    <ul className="Messages__list">
      {messages.map((message, index) => (
        <li
          key={index}
          className={
            message.member.id === currentMember.id
              ? "Messages__message currentMember"
              : "Messages__message"
          }
        >
          <span
            className="Messages__avatar"
            style={{ backgroundColor: message.member.clientData.color }}
          />
          <div className="Messages__content">
            <div className="Messages__username">{message.member.clientData.username}</div>
            <div className="Messages__text">{message.text}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Messages;
