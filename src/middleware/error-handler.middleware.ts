import type { NextFunction, Request, Response } from "express";

import {
  CountyAlreadyExistsError,
  CountyNotFoundError,
} from "../modules/counties/counties.errors.ts";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (error instanceof CountyAlreadyExistsError) {
    res.status(409).json({
      error: {
        code: "COUNTY_ALREADY_EXISTS",
        message: error.message,
      },
    });
    return;
  }

  if (error instanceof CountyNotFoundError) {
    res.status(400).json({
      error: {
        code: "COUNTY_NOT_FOUND",
        message: error.message,
      },
    });
    return;
  }

  console.error("Unhandled request error:", error);

  res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    },
  });
}
