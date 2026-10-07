import { CognitoJwtVerifier } from "aws-jwt-verify";
import { config } from "../../config/env.ts";

export const accessTokenVerifier = CognitoJwtVerifier.create({
  userPoolId: config.cognito.userPool,
  clientId: config.cognito.client,
  tokenUse: "access",
});
