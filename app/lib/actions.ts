"use server";

import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { z } from "zod";
import { signIn } from "@/auth";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export type State = {
  errors?: {
    contactId?: string[];
    status?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  contactId: z.string({
    invalid_type_error: "Please select a contact.",
  }),
  status: z.enum(["return", "pending", "lw"], {
    invalid_type_error: "Please select an call status.",
  }),
  date: z.string(),
});

const CreateCall = FormSchema.omit({ id: true, date: true });
const UpdateCall = FormSchema.omit({ id: true, date: true });

export async function createCall(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateCall.safeParse({
    contactId: formData.get("contactId"),
    status: formData.get("status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Call.",
    };
  }

  // Prepare data for insertion into the database
  const { contactId, status } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO calls (contact_id, status, date)
      VALUES (${contactId}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Call.",
    };
  }

  // Revalidate the cache for the calls page and redirect the user.
  revalidatePath("/calls");
  redirect("/calls");
}

export async function updateCall(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateCall.safeParse({
    contactId: formData.get("contactId"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Call.",
    };
  }

  const { contactId, status } = validatedFields.data;

  try {
    await sql`
      UPDATE calls
      SET contact_id = ${contactId}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Call." };
  }

  revalidatePath("/calls");
  redirect("/calls");
}

export async function deleteCall(id: string) {
  await sql`DELETE FROM calls WHERE id = ${id}`;
  revalidatePath("/calls");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
