export type GreenApiCredentials = {
  idInstance: string;
  apiTokenInstance: string;
};

export type CheckAccountRequest = {
  phoneNumber: number;
};

type CheckAccountFoundResponse = {
  exist: true;
  chatId: string;
  username: string;
  phoneNumber: number;
  fromCache: boolean;
};

type CheckAccountNotFoundResponse = {
  exist: false;
  chatId: string;
};

type CheckAccountErrorResponse = {
  status: false;
  reason?: string;
  data?: {
    status: string;
    reason: string;
    retryAfter?: number;
  };
};

export type CheckAccountResponse =
  | CheckAccountFoundResponse
  | CheckAccountNotFoundResponse;

export type CheckAccountApiResponse =
  | CheckAccountResponse
  | CheckAccountErrorResponse;

export type SendMessageRequest = {
  chatId: string;
  message: string;
};

export type SendMessageResponse = {
  idMessage: string;
};

export type IncomingTextMessage = {
  idMessage: string;
  chatId: string;
  timestamp: number;
  text: string;
};

export type ReceiveNotification = {
  receiptId: number;
  body: unknown;
};

export type ReceiveNotificationResponse = ReceiveNotification | null;

export type DeleteNotificationResponse = {
  result: boolean;
};
