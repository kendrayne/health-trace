import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  disclaimer: z
    .boolean()
    .refine((val) => val === true, { message: "You must accept the disclaimer" }),
});

export const LoginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(1, "Password is required"),
});

export const HealthLogSchema = z.object({
  alcohol: z.number,
  nicotine: z.number,
  caffeine: z.number,
  mood: z.number,
  sleep: z.number,
  dietQuality: z.number,
  exercise: z.number,
  loggedSymptoms: z.array,
  loggedMedications: z.string,


})

export const ReportSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),

});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;