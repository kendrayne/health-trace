"use server";

import { prisma } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { RegisterSchema  } from "@/schemas";
type RegisterValues = z.infer<typeof RegisterSchema>;

export const register = async (values: RegisterValues) => {
  const parsed = RegisterSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }

  const { name, email, password } = parsed.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Email already taken");

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return { success: "Account created!" };
};
