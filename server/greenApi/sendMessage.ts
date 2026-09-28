import { requestGreenApi } from "./client.js";

type Params = {
  idInstance: string;
  apiTokenInstance: string;
  chatId: string;
  message: string;
};

export const sendMessage = ({
  idInstance,
  apiTokenInstance,
  chatId,
  message,
}: Params): Promise<Response> => {
  return requestGreenApi({
    idInstance,
    apiTokenInstance,
    endpoint: "sendMessage",
    method: "POST",
    body: {
      chatId,
      message,
    },
  });
};
