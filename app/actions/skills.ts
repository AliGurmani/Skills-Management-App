"use server";

import { revalidatePath } from "next/cache";
import { addSkill, skills } from "../data/skills";
import { redirect } from "next/navigation";

export const createSkill = async (prevState: any, formData: FormData) => {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;

  if (!name || !category || !description) {
    return {
      message: null,
      error: "All fields are required",
    };
  }

  const id = (skills.length + 1).toString();
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  addSkill({ id, name, category, description, createdAt, updatedAt });

  revalidatePath("/skills");
  redirect("/skills");

  return {
    message: "Skill created successfully",
    error: null,
  };
};
