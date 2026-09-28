import { requestGreenApi } from "./client";

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
