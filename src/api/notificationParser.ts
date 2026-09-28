import type { IncomingTextMessage } from "./types";

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

export const parseIncomingTextMessage = (
  value: unknown,
): IncomingTextMessage | null => {
  if (
    !isRecord(value) ||
    value.typeWebhook !== "incomingMessageReceived" ||
    typeof value.idMessage !== "string" ||
    typeof value.timestamp !== "number"
  ) {
    return null;
  }

  const senderData = value.senderData;
  const messageData = value.messageData;

  if (
    !isRecord(senderData) ||
    typeof senderData.chatId !== "string" ||
    !isRecord(messageData) ||
    messageData.typeMessage !== "textMessage"
  ) {
    return null;
  }

  const textMessageData = messageData.textMessageData;

  if (
    !isRecord(textMessageData) ||
    typeof textMessageData.textMessage !== "string"
  ) {
    return null;
  }

  return {
    idMessage: value.idMessage,
    chatId: senderData.chatId,
    timestamp: value.timestamp,
    text: textMessageData.textMessage,
  };
};
