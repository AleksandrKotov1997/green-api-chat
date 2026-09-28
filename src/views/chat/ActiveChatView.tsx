import { Typography } from "antd";
import { useCallback, useState } from "react";

import type { GreenApiCredentials } from "~/api";

import { ChatHeader, MessageComposer, MessageList } from "./components";
import { useIncomingMessages, useSendMessage } from "./hooks";
import type { Chat, ChatMessage } from "./types";

const { Text } = Typography;

type Props = {
  credentials: GreenApiCredentials;
  chat: Chat;
};

export const ActiveChatView = ({ credentials, chat }: Props) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const {
    sendChatMessage,
    isSending,
    errorMessage: sendErrorMessage,
  } = useSendMessage();

  const handleIncomingMessage = useCallback((message: ChatMessage) => {
    setMessages((currentMessages) => [...currentMessages, message]);
  }, []);

  const { errorMessage: receiveErrorMessage } = useIncomingMessages({
    credentials,
    chatId: chat.chatId,
    onMessage: handleIncomingMessage,
  });

  const handleSend = async (text: string): Promise<boolean> => {
    const idMessage = await sendChatMessage({
      credentials,
      chatId: chat.chatId,
      text,
    });

    if (!idMessage) {
      return false;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: idMessage,
        text,
        timestamp: Date.now(),
        direction: "outgoing",
      },
    ]);

    return true;
  };

  return (
    <main className="chat-screen">
      <section className="chat-window">
        <ChatHeader phoneNumber={chat.phoneNumber} />

        {receiveErrorMessage && (
          <Text className="chat-window__error" type="danger">
            {receiveErrorMessage}
          </Text>
        )}

        <div className="chat-window__messages">
          <MessageList messages={messages} />
        </div>

        <MessageComposer
          isSending={isSending}
          errorMessage={sendErrorMessage}
          onSend={handleSend}
        />
      </section>
    </main>
  );
};
