import axios from "axios";

type ApiErrorResponse = {
  message?: string;
  reason?: string;
  description?: string;
  data?: {
    reason?: string;
  };
};

const getApiErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError<ApiErrorResponse | string>(error)) {
    return error instanceof Error ? error.message : "Unexpected API error.";
  }

  const responseData = error.response?.data;

  if (typeof responseData === "string") {
    return responseData.trim() || error.message || "API request failed.";
  }

  if (responseData?.message) {
    return responseData.message;
  }

  if (responseData?.reason) {
    return responseData.reason;
  }

  if (responseData?.data?.reason) {
    return responseData.data.reason;
  }

  if (responseData?.description) {
    return responseData.description;
  }

  if (!error.response) {
    return "Unable to connect to server.";
  }

  return error.message || "API request failed.";
};

export const apiClient = axios.create({
  baseURL: "/api",
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isCancel(error)) {
      throw error;
    }

    throw new Error(getApiErrorMessage(error));
  },
);
