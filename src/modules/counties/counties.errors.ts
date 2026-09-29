import type { ZodError } from "zod";

export class CountyAlreadyExistsError extends Error {
  constructor() {
    super("A county with this code or slug already exists");
    this.name = "CountyAlreadyExistsError";
  }
}

export class CountyNotFoundError extends Error {
  constructor() {
    super("County not found");
    this.name = "CountyNotFoundError";
  }
}

export const getValidationError = (error: ZodError) => ({
  code: "VALIDATION_ERROR",
  message: "Invalid req body",
  details: error.issues.map(({ path, message }) => ({
    path,
    message,
  })),
});

export const COUNTY_NOT_FOUND = {
  code: "COUNTY_NOT_FOUND",
  message: "County not found",
};
