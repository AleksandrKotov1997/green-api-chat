import { Typography } from "antd";

import type { ChatMessage } from "../types";

const { Text } = Typography;

type Props = {
  messages: ChatMessage[];
};

const formatMessageTime = (timestamp: number): string => {
  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(timestamp);
};

export const MessageList = ({ messages }: Props) => {
  if (messages.length === 0) {
    return (
      <div className="message-list__empty">
        <Text type="secondary">No messages yet</Text>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.map((message) => (
        <div
          className={`message-list__item message-list__item--${message.direction}`}
          key={message.id}
        >
          <div className="message-list__bubble">
            <div className="message-list__text">{message.text}</div>

            <Text className="message-list__time" type="secondary">
              {formatMessageTime(message.timestamp)}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
};
