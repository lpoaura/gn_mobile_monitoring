import { AppError } from "../_models/appError.model";

export const NETWORK_ERROR: AppError = { key: "errors.global.network" };

export const UNKNOWN_ERROR: AppError = { key: "errors.global.unknownLight" };

export const errorUtils = {
  getErrorMessage(error?: AppError | string) {
    return typeof error === "string"
      ? error
      : error?.key ?? "errors.global.unknownLight";
  },
};
