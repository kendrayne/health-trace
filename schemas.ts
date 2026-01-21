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
  alcohol: z.number().nullable(), 
  nicotine: z.number().nullable(),
  caffeine: z.number().nullable(),
  marijuana: z.number().nullable(),
  mood: z.number().nullable(),
  sleep: z.number().nullable(),
  dietQuality: z.number().nullable(),
  exercise: z.number().nullable(),
  water: z.number().nullable(),
  loggedSymptoms: z.array(z.object()),
  loggedMedications: z.array(z.object()),
  userId: z.string()
})


export const ReportSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),

});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;