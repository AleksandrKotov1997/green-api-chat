import { useEffect, useState } from "react";

import {
  deleteNotification,
  parseIncomingTextMessage,
  receiveNotification,
  type GreenApiCredentials,
} from "~/api";
import { getErrorMessage } from "~/shared/utils/errors";

import type { ChatMessage } from "../types";

type UseIncomingMessagesParams = {
  credentials: GreenApiCredentials;
  chatId: string;
  onMessage: (message: ChatMessage) => void;
};

type UseIncomingMessagesResult = {
  errorMessage: string | null;
};

const RETRY_DELAY_MS = 1000;

export const useIncomingMessages = ({
  credentials,
  chatId,
  onMessage,
}: UseIncomingMessagesParams): UseIncomingMessagesResult => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();

    const receiveMessages = async () => {
      while (isActive) {
        try {
          const notification = await receiveNotification(
            credentials,
            controller.signal,
          );

          if (!isActive) {
            return;
          }

          setErrorMessage(null);

          if (!notification) {
            continue;
          }

          const incomingMessage = parseIncomingTextMessage(notification.body);

          const deleteResponse = await deleteNotification(
            credentials,
            notification.receiptId,
          );

          if (!deleteResponse.result) {
            throw new Error("Failed to delete GREEN-API notification.");
          }

          if (
            isActive &&
            incomingMessage &&
            incomingMessage.chatId === chatId
          ) {
            onMessage({
              id: incomingMessage.idMessage,
              text: incomingMessage.text,
              timestamp: incomingMessage.timestamp * 1000,
              direction: "incoming",
            });
          }
        } catch (error: unknown) {
          if (!isActive) {
            return;
          }

          setErrorMessage(getErrorMessage(error));

          await new Promise<void>((resolve) => {
            window.setTimeout(resolve, RETRY_DELAY_MS);
          });
        }
      }
    };

    void receiveMessages();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [chatId, credentials, onMessage]);

  return {
    errorMessage,
  };
};
