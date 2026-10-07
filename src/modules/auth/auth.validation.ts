import * as z from "zod";

export const authRegisterSchema = z
  .object({
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerConfirmationSchema = z.object({
  email: z.email(),
  code: z.string().trim().min(1, "Confirmation code is required"),
});

export const resendConfirmationCodeSchema = z.object({
  email: z.email(),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const forgotPasswordSchema = z.object({
  email: z.email(),
});
