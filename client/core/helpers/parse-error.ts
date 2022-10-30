import { AxiosError } from "axios";

const SERVER_ERROR = "Server error.";

export type AppError =
  | { status: string; messages: string[] }
  | null
  | undefined;

export const parseError = (error: unknown): AppError => {
  let responseStatus, errorMessages;
  if (error instanceof AxiosError) {
    const { status, messages } = error?.response?.data;
    responseStatus = status || "500";
    errorMessages = messages || SERVER_ERROR;
  } else if (error instanceof Error) {
    responseStatus = "500";
    errorMessages = [error.message || SERVER_ERROR];
  } else {
    responseStatus = "500";
    errorMessages = [SERVER_ERROR];
  }
  return {
    status: responseStatus,
    messages: errorMessages,
  };
};

export const getErrorMessage = (error: unknown) => {
  return parseError(error)?.messages[0] || "";
};
