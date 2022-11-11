import { AxiosError } from "axios";

const SERVER_ERROR = "Server error.";

const fallbackError = {
  status: "500",
  messages: [SERVER_ERROR],
};

export type AppError =
  | { status: string; messages: string[] }
  | null
  | undefined;

export const parseError = (error?: unknown): AppError => {
  try {
    let responseStatus, errorMessages;
    if (!error) {
      return;
    }
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
  } catch (error) {
    console.log("Uncatched error: " + JSON.stringify(error));
    return fallbackError;
  }
};

export const getErrorMessage = (error: unknown) => {
  return parseError(error)?.messages[0] || "";
};
