const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again.";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return DEFAULT_ERROR_MESSAGE;
};
