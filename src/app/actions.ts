"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { todos } from "@/db/schema";

export async function addTodo(formData: FormData) {
  const text = formData.get("text");
  if (typeof text !== "string" || text.trim().length === 0) return;

  await db.insert(todos).values({ text: text.trim() });
  revalidatePath("/");
}

export async function toggleTodo(id: number, completed: boolean) {
  await db.update(todos).set({ completed }).where(eq(todos.id, id));
  revalidatePath("/");
}

export async function deleteTodo(id: number) {
  await db.delete(todos).where(eq(todos.id, id));
  revalidatePath("/");
}
