"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8, "Password must be at least 8 characters").optional(),
});

export async function updateProfile(data: {
  name: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
}): Promise<{ error?: string; success?: boolean }> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Validation failed" };
  }

  const { name, email, currentPassword, newPassword } = parsed.data;

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return { error: "User not found" };

  if (newPassword) {
    if (!user.password) {
      return { error: "Cannot set a password for accounts linked via Google" };
    }
    if (!currentPassword) {
      return { error: "Current password is required to set a new one" };
    }
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return { error: "Current password is incorrect" };
  }

  if (email !== user.email) {
    const taken = await prisma.user.findUnique({ where: { email } });
    if (taken) return { error: "This email address is already in use" };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateData: Record<string, any> = { name, email };
  if (newPassword) updateData.password = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({ where: { id: session.user.id }, data: updateData });

  revalidatePath("/dashboard/profile");
  return { success: true };
}
