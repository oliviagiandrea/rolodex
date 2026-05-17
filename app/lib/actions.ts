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
    name?: string[];
    company?: string[];
    phone?: string[];
    status?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  contactId: z.string({
    invalid_type_error: "Please select a contact.",
  }),
  name: z.string({
    invalid_type_error: "Please enter a name.",
  }),
  company: z.string({
    invalid_type_error: "Please enter a company.",
  }),
  phone: z.string({
    invalid_type_error: "Please enter a phone number.",
  }),
  status: z.enum(["return", "pending", "lw"], {
    invalid_type_error: "Please select a call status.",
  }),
  notes: z.string().optional(),
  date: z.string(),
});

const CreateCall = FormSchema.omit({ id: true, date: true });
const UpdateCall = FormSchema.omit({ id: true, date: true });

export async function createCall(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateCall.safeParse({
    contactId: formData.get("contactId"),
    name: formData.get("name"),
    company: formData.get("company"),
    phone: formData.get("phone"),
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
  const { contactId, name, company, phone, status, notes } =
    validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO calls (contact_id, contact_name, company, phone, status, notes, date)
      VALUES (${contactId}, ${name}, ${company}, ${phone}, ${status}, ${notes ? notes : ""}, ${date})
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
    name: formData.get("name"),
    company: formData.get("company"),
    phone: formData.get("phone"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Call.",
    };
  }

  const { contactId, name, company, phone, status, notes } =
    validatedFields.data;

  try {
    await sql`
      UPDATE calls
      SET contact_id = ${contactId}, contact_name=${name}, company = ${company}, phone = ${phone}, status = ${status}, notes = ${notes ? notes : ""}
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
