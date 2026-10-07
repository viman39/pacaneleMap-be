import type { Request, Response, NextFunction } from "express";
import {
  UnauthenticatedError,
  UnauthorizedError,
} from "../modules/auth/auth.error.ts";

export function requirePermission() {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.auth) {
      next(new UnauthenticatedError());
      return;
    }

    if (req.auth.userId !== process.env?.ADMIN_USER_ID) {
      next(new UnauthorizedError());
      return;
    }

    next();
  };
}
