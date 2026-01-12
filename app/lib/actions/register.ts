"use server"
import { prisma } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";

export const register = async (values: any) => {
  const validated = RegisterSchema.safeParse(values);
  
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const { email, password, name } = validated.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return { error: "Email already taken" };

    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return { success: "Account created!" };
  } catch {
    return { error: "Database error" };
  }
};