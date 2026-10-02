import type { ZodError } from "zod";

export const getValidationError = (error: ZodError) => ({
  code: "VALIDATION_ERROR",
  message: "Invalid req body",
  details: error.issues.map(({ path, message }) => ({
    path,
    message,
  })),
});
