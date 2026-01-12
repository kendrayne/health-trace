import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Requires one uppercase letter")
    .regex(/[0-9]/, "Requires one number")
    .regex(/[^a-zA-Z0-9]/, "Requires one symbol"),
});

export const LoginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(1, "Password is required"),
});


export const ReportSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),

});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;