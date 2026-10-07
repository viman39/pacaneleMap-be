import * as provider from "./auth.provider.ts";

export function registerUser(email: string, password: string) {
  return provider.registerUser(email, password);
}

export function confirmUser(email: string, code: string) {
  return provider.confirmUser(email, code);
}

export function resendConfirmationCode(email: string) {
  return provider.resendConfirmationCode(email);
}

export function loginUser(email: string, password: string) {
  return provider.loginUser(email, password);
}

export function resetPassword(email: string) {
  return provider.resetUserPassword(email);
}
