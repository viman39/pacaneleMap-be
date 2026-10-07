import type { Request, Response } from "express";
import {
  authRegisterSchema,
  forgotPasswordSchema,
  loginSchema,
  registerConfirmationSchema,
  resendConfirmationCodeSchema,
} from "./auth.validation.ts";
import { getValidationError } from "../../utils/error.utils.ts";
import * as service from "./auth.service.ts";
import { UnauthenticatedError } from "./auth.error.ts";

export async function loginUser(req: Request, res: Response) {
  const reqBody = loginSchema.safeParse(req?.body);

  if (!reqBody.success) {
    res.status(400).json({
      error: getValidationError(reqBody.error),
    });
    return;
  }

  res
    .status(200)
    .json(await service.loginUser(reqBody.data.email, reqBody.data.password));
}

export async function registerUser(req: Request, res: Response) {
  const reqBody = authRegisterSchema.safeParse(req?.body);

  if (!reqBody.success) {
    res.status(400).json({
      error: getValidationError(reqBody.error),
    });
    return;
  }

  const user = await service.registerUser(
    reqBody.data.email,
    reqBody.data.password,
  );

  res.status(200).json({ user });
}

export async function forgotPassword(req: Request, res: Response) {
  const reqBody = forgotPasswordSchema.safeParse(req.body);

  if (!reqBody.success) {
    res.status(400).json({
      error: getValidationError(reqBody.error),
    });
    return;
  }

  const reset = await service.resetPassword(reqBody.data.email);

  res.status(200).json(reset);
}

export async function confirmRegistration(req: Request, res: Response) {
  const reqBody = registerConfirmationSchema.safeParse(req.body);

  if (!reqBody.success) {
    res.status(400).json({
      error: getValidationError(reqBody.error),
    });
    return;
  }

  const confirmation = await service.confirmUser(
    reqBody.data.email,
    reqBody.data.code,
  );

  res.status(200).json(confirmation);
}

export async function resendConfirmationCode(req: Request, res: Response) {
  const reqBody = resendConfirmationCodeSchema.safeParse(req.body);

  if (!reqBody.success) {
    res.status(400).json({
      error: getValidationError(reqBody.error),
    });
    return;
  }

  const confirmation = await service.resendConfirmationCode(reqBody.data.email);

  res.status(200).json(confirmation);
}

export function getCurrentUser(req: Request, res: Response) {
  if (!req?.auth) {
    throw new UnauthenticatedError();
  }

  res.status(200).json({
    user: {
      id: req.auth.userId,
    },
  });
}
