const GREEN_API_BASE_URL = "https://api.green-api.com";

type GreenApiEndpoint =
  | "checkAccount"
  | "sendMessage"
  | "receiveNotification"
  | "deleteNotification";

type GreenApiHttpMethod = "GET" | "POST" | "DELETE";

type Params = {
  idInstance: string;
  apiTokenInstance: string;
  endpoint: GreenApiEndpoint;
  method: GreenApiHttpMethod;
  body?: unknown;
  pathSuffix?: string;
  signal?: AbortSignal;
};

export const requestGreenApi = ({
  idInstance,
  apiTokenInstance,
  endpoint,
  method,
  body,
  pathSuffix,
  signal,
}: Params): Promise<Response> => {
  const suffix = pathSuffix ? `/${encodeURIComponent(pathSuffix)}` : "";

  const url =
    `${GREEN_API_BASE_URL}/waInstance${encodeURIComponent(idInstance)}` +
    `/${endpoint}/${encodeURIComponent(apiTokenInstance)}${suffix}`;

  return fetch(url, {
    method,
    headers:
      body === undefined
        ? undefined
        : {
            "Content-Type": "application/json",
          },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });
};
