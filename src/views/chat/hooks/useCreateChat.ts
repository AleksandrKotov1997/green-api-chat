import { useCallback, useState } from "react";

import { checkAccount, type GreenApiCredentials } from "~/api";
import { getErrorMessage } from "~/shared/utils/errors";

import type { Chat } from "../types";

type CreateChatParams = {
  credentials: GreenApiCredentials;
  phoneNumber: string;
};

type UseCreateChatResult = {
  createChat: (params: CreateChatParams) => Promise<Chat | null>;
  isCreating: boolean;
  errorMessage: string | null;
};

export const useCreateChat = (): UseCreateChatResult => {
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const createChat = useCallback(
    async ({
      credentials,
      phoneNumber,
    }: CreateChatParams): Promise<Chat | null> => {
      setIsCreating(true);
      setErrorMessage(null);

      try {
        const response = await checkAccount(credentials, {
          phoneNumber: Number(phoneNumber),
        });

        if (!response.exist) {
          setErrorMessage("Telegram account not found.");

          return null;
        }

        return {
          chatId: response.chatId,
          phoneNumber,
        };
      } catch (error: unknown) {
        setErrorMessage(getErrorMessage(error));

        return null;
      } finally {
        setIsCreating(false);
      }
    },
    [],
  );

  return {
    createChat,
    isCreating,
    errorMessage,
  };
};
