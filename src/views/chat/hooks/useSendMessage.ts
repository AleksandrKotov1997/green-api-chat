import { useCallback, useState } from "react";

import { sendMessage, type GreenApiCredentials } from "~/api";
import { getErrorMessage } from "~/shared/utils/errors";

type SendChatMessageParams = {
  credentials: GreenApiCredentials;
  chatId: string;
  text: string;
};

type UseSendMessageResult = {
  sendChatMessage: (params: SendChatMessageParams) => Promise<string | null>;
  isSending: boolean;
  errorMessage: string | null;
};

export const useSendMessage = (): UseSendMessageResult => {
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sendChatMessage = useCallback(
    async ({
      credentials,
      chatId,
      text,
    }: SendChatMessageParams): Promise<string | null> => {
      setIsSending(true);
      setErrorMessage(null);

      try {
        const response = await sendMessage(credentials, {
          chatId,
          message: text,
        });

        return response.idMessage;
      } catch (error: unknown) {
        setErrorMessage(getErrorMessage(error));

        return null;
      } finally {
        setIsSending(false);
      }
    },
    [],
  );

  return {
    sendChatMessage,
    isSending,
    errorMessage,
  };
};
