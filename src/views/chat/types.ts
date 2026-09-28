export type Chat = {
  chatId: string;
  phoneNumber: string;
};

export type ChatMessage = {
  id: string;
  text: string;
  timestamp: number;
  direction: "incoming" | "outgoing";
};

export type CreateChatFormValues = {
  idInstance: string;
  apiTokenInstance: string;
  phoneNumber: string;
};
