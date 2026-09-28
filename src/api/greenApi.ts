import { apiClient } from "./apiClient";

import type {
  CheckAccountApiResponse,
  CheckAccountRequest,
  CheckAccountResponse,
  DeleteNotificationResponse,
  GreenApiCredentials,
  ReceiveNotificationResponse,
  SendMessageRequest,
  SendMessageResponse,
} from "./types";

export const checkAccount = async (
  credentials: GreenApiCredentials,
  payload: CheckAccountRequest,
): Promise<CheckAccountResponse> => {
  const { data } = await apiClient.post<CheckAccountApiResponse>(
    "/check-account",
    {
      ...credentials,
      ...payload,
    },
  );

  if ("exist" in data) {
    return data;
  }

  throw new Error(
    data.reason ?? data.data?.reason ?? "Failed to check Telegram account.",
  );
};

export const sendMessage = async (
  credentials: GreenApiCredentials,
  payload: SendMessageRequest,
): Promise<SendMessageResponse> => {
  const { data } = await apiClient.post<SendMessageResponse>("/send-message", {
    ...credentials,
    ...payload,
  });

  return data;
};

export const receiveNotification = async (
  credentials: GreenApiCredentials,
  signal?: AbortSignal,
): Promise<ReceiveNotificationResponse> => {
  const { data } = await apiClient.post<ReceiveNotificationResponse>(
    "/receive-notification",
    credentials,
    {
      signal,
    },
  );

  return data;
};

export const deleteNotification = async (
  credentials: GreenApiCredentials,
  receiptId: number,
): Promise<DeleteNotificationResponse> => {
  const { data } = await apiClient.post<DeleteNotificationResponse>(
    "/delete-notification",
    {
      ...credentials,
      receiptId,
    },
  );

  return data;
};
