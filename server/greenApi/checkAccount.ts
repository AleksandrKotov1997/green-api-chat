import { requestGreenApi } from "./client.js";

type Params = {
  idInstance: string;
  apiTokenInstance: string;
  phoneNumber: number;
};

export const checkAccount = ({
  idInstance,
  apiTokenInstance,
  phoneNumber,
}: Params): Promise<Response> => {
  return requestGreenApi({
    idInstance,
    apiTokenInstance,
    endpoint: "checkAccount",
    method: "POST",
    body: {
      phoneNumber,
    },
  });
};
