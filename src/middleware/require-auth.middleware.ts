import type { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "../modules/auth/auth.error.ts";
import {
  JwtInvalidClaimError,
  JwtInvalidSignatureAlgorithmError,
  JwtInvalidSignatureError,
  JwtParseError,
  JwtWithoutValidKidError,
  KidNotFoundInJwksError,
} from "aws-jwt-verify/error";
import { accessTokenVerifier } from "../integrations/cognito/cognito.verifier.ts";

export async function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authorization = req.get("Authorization");
  const match = authorization?.match(/^Bearer +(\S+)$/i);
  const token = match?.[1];

  if (!token) {
    next(new UnauthenticatedError());
    return;
  }

  try {
    const payload = await accessTokenVerifier.verify(token);

    req.auth = {
      userId: payload.sub,
    };
  } catch (e) {
    if (
      e instanceof JwtParseError ||
      e instanceof JwtInvalidClaimError ||
      e instanceof JwtInvalidSignatureError ||
      e instanceof JwtInvalidSignatureAlgorithmError ||
      e instanceof JwtWithoutValidKidError ||
      e instanceof KidNotFoundInJwksError
    ) {
      next(new UnauthenticatedError());
      return;
    }

    next(e);
    return;
  }

  next();
}
