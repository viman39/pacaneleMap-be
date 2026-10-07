import { Router } from "express";
import {
  forgotPassword,
  loginUser,
  registerUser,
  confirmRegistration,
  resendConfirmationCode,
  getCurrentUser,
} from "./auth.controller.ts";
import { requireAuth } from "../../middleware/require-auth.middleware.ts";

export const authRouter = Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.post("/register/confirm", confirmRegistration);
authRouter.post("/register/resend-code", resendConfirmationCode);
authRouter.post("/forgot-password", forgotPassword);
authRouter.get("/me", requireAuth, getCurrentUser);
