export class EmailAlreadyInUseError extends Error {
  constructor() {
    super("Email already in use");
    this.name = "EmailAlreadyInUseError";
  }
}

export class PasswordPolicyError extends Error {
  constructor() {
    super("Password does not meet the required policy");
    this.name = "PasswordPolicyError";
  }
}

export class CodeMismatchError extends Error {
  constructor() {
    super("Code is incorrect");
    this.name = "CodeMismatchError";
  }
}

export class CodeExpiredError extends Error {
  constructor() {
    super("Code expired");
    this.name = "CodeExpiredError";
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super("User not found");
    this.name = "UserNotFoundError";
  }
}

export class UserNotConfirmedError extends Error {
  constructor() {
    super("User not confirmed");
    this.name = "UserNotConfirmedError";
  }
}

export class InvalidCredentialsError extends Error {
  constructor() {
    super("Invalid Credentials");
    this.name = "InvalidCredentialsError";
  }
}

export class UnauthenticatedError extends Error {
  constructor() {
    super("You must be authenticated");
    this.name = "UnauthenticatedError";
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super("You must be authorized");
    this.name = "UnauthorizedError";
  }
}
