import type { NextFunction, Request, Response } from "express";

import {
  CountyAlreadyExistsError,
  CountyNotFoundError,
} from "../modules/counties/counties.errors.ts";
import {
  UatAlreadyExistsError,
  UatNotFoundError,
} from "../modules/uats/uats.errors.ts";
import {
  CodeExpiredError,
  CodeMismatchError,
  EmailAlreadyInUseError,
  InvalidCredentialsError,
  PasswordPolicyError,
  UnauthenticatedError,
  UnauthorizedError,
  UserNotConfirmedError,
  UserNotFoundError,
} from "../modules/auth/auth.error.ts";

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
    res.status(404).json({
      error: {
        code: "COUNTY_NOT_FOUND",
        message: error.message,
      },
    });
    return;
  }

  if (error instanceof UatNotFoundError) {
    res.status(404).json({
      error: {
        code: "UAT_NOT_FOUND",
        message: error.message,
      },
    });
    return;
  }

  if (error instanceof UatAlreadyExistsError) {
    res.status(409).json({
      error: {
        code: "UAT_ALREADY_EXISTS",
        message: error.message,
      },
    });
    return;
  }

  if (error instanceof EmailAlreadyInUseError) {
    res.status(409).json({
      error: {
        code: "EMAIL_ALREADY_IN_USE",
        message: error.message,
      },
    });
    return;
  }

  if (error instanceof PasswordPolicyError) {
    res.status(400).json({
      error: {
        code: "INVALID_PASSWORD",
        message: error.message,
      },
    });
    return;
  }

  if (error instanceof CodeMismatchError) {
    res.status(400).json({
      error: {
        code: "WRONG_CODE",
        message: error.message,
      },
    });
    return;
  }

  if (error instanceof CodeExpiredError) {
    res.status(400).json({
      error: {
        code: "CODE_EXPIRED",
        message: error.message,
      },
    });
    return;
  }

  if (error instanceof UserNotFoundError) {
    res.status(404).json({
      error: {
        code: "USER_NOT_FOUND",
        message: error.message,
      },
    });
    return;
  }

  if (error instanceof UserNotConfirmedError) {
    res.status(400).json({
      error: {
        code: "USER_NOT_CONFIRMED",
        message: error.message,
      },
    });
    return;
  }

  if (error instanceof InvalidCredentialsError) {
    res.status(401).json({
      error: {
        code: "INVALID_CREDENTIALS",
        message: error.message,
      },
    });
    return;
  }

  if (error instanceof UnauthenticatedError) {
    res.setHeader("WWW-Authenticate", "Bearer");

    res.status(401).json({
      error: {
        code: "UNAUTHENTICATED_ERROR",
        message: error.message,
      },
    });
    return;
  }

  if (error instanceof UnauthorizedError) {
    res.status(403).json({
      error: {
        code: "UNAUTHORIZED_ERROR",
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
