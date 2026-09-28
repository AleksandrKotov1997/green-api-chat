import { requestGreenApi } from "./client.js";

type Params = {
  idInstance: string;
  apiTokenInstance: string;
  signal?: AbortSignal;
};

export const receiveNotification = ({
  idInstance,
  apiTokenInstance,
  signal,
}: Params): Promise<Response> => {
  return requestGreenApi({
    idInstance,
    apiTokenInstance,
    endpoint: "receiveNotification",
    method: "GET",
    signal,
  });
};
