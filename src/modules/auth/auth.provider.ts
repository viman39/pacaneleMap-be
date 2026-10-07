import { createHmac } from "node:crypto";
import { config } from "../../config/env.ts";
import {
  AuthFlowType,
  CodeMismatchException,
  ConfirmSignUpCommand,
  ExpiredCodeException,
  InitiateAuthCommand,
  InvalidPasswordException,
  NotAuthorizedException,
  ResendConfirmationCodeCommand,
  SignUpCommand,
  UsernameExistsException,
  UserNotConfirmedException,
  UserNotFoundException,
} from "@aws-sdk/client-cognito-identity-provider";
import {
  CodeExpiredError,
  CodeMismatchError,
  EmailAlreadyInUseError,
  InvalidCredentialsError,
  PasswordPolicyError,
  UserNotConfirmedError,
  UserNotFoundError,
} from "./auth.error.ts";
import { cognitoClient } from "../../integrations/cognito/cognito.client.ts";

function calculateUserHash(email: string): string {
  return createHmac("sha256", config.cognito.clientSecret)
    .update(email + config.cognito.client)
    .digest("base64");
}

export async function registerUser(email: string, password: string) {
  try {
    const result = await cognitoClient.send(
      new SignUpCommand({
        ClientId: config.cognito.client,
        Username: email,
        Password: password,
        SecretHash: calculateUserHash(email),
        UserAttributes: [
          {
            Name: "email",
            Value: email,
          },
        ],
      }),
    );

    return {
      userId: result.UserSub,
      confirmed: result.UserConfirmed,
      nextStep: result.UserConfirmed ? "LOGIN" : "CONFIRM_EMAIL",
    };
  } catch (e) {
    if (e instanceof UsernameExistsException) {
      throw new EmailAlreadyInUseError();
    }

    if (e instanceof InvalidPasswordException) {
      throw new PasswordPolicyError();
    }

    throw e;
  }
}

export async function confirmUser(email: string, code: string) {
  console.log(email, code);
  try {
    await cognitoClient.send(
      new ConfirmSignUpCommand({
        ClientId: config.cognito.client,
        Username: email,
        ConfirmationCode: code,
        SecretHash: calculateUserHash(email),
      }),
    );

    return {
      message: "Email confirmed successfully",
      nextStep: "LOGIN",
    };
  } catch (e) {
    if (e instanceof CodeMismatchException) {
      throw new CodeMismatchError();
    }

    if (e instanceof ExpiredCodeException) {
      throw new CodeExpiredError();
    }

    if (e instanceof UserNotFoundException) {
      throw new UserNotFoundError();
    }

    throw e;
  }
}

export async function resendConfirmationCode(email: string) {
  try {
    await cognitoClient.send(
      new ResendConfirmationCodeCommand({
        ClientId: config.cognito.client,
        Username: email,
        SecretHash: calculateUserHash(email),
      }),
    );

    return {
      message: "Confirmation code resent",
      nextStep: "CONFIRM_EMAIL",
    };
  } catch (e) {
    if (e instanceof UserNotFoundException) {
      throw new UserNotFoundError();
    }

    throw e;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const result = await cognitoClient.send(
      new InitiateAuthCommand({
        AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
          SECRET_HASH: calculateUserHash(email),
        },
        ClientId: config.cognito.client,
      }),
    );

    if (!result.AuthenticationResult?.AccessToken) {
      throw new Error("Cognito did not return an access token");
    }

    return {
      accesstoken: result.AuthenticationResult?.AccessToken,
      refreshToken: result?.AuthenticationResult?.RefreshToken,
      expiresIn: result?.AuthenticationResult?.ExpiresIn,
      tokenType: result?.AuthenticationResult?.TokenType,
    };
  } catch (e) {
    if (e instanceof UserNotConfirmedException) {
      throw new UserNotConfirmedError();
    }

    if (e instanceof UserNotFoundException) {
      throw new UserNotFoundError();
    }

    if (e instanceof NotAuthorizedException) {
      throw new InvalidCredentialsError();
    }

    throw e;
  }
}

export async function resetUserPassword(email: string) {
  try {
    console.log(email);

    return {
      message: "An email has been sent",
      nextStep: "RESET_PASSWORD",
    };
  } catch (e) {
    throw e;
  }
}
