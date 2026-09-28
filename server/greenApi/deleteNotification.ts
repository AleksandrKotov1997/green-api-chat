import { requestGreenApi } from "./client.js";

type Params = {
  idInstance: string;
  apiTokenInstance: string;
  receiptId: number;
};

export const deleteNotification = ({
  idInstance,
  apiTokenInstance,
  receiptId,
}: Params): Promise<Response> => {
  return requestGreenApi({
    idInstance,
    apiTokenInstance,
    endpoint: "deleteNotification",
    method: "DELETE",
    pathSuffix: String(receiptId),
  });
};
