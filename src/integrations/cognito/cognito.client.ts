import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

import { config } from "../../config/env.ts";

export const cognitoClient = new CognitoIdentityProviderClient({
  region: config.cognito.region,
});
