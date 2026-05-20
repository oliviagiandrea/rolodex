"use server";

import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";
import { z } from "zod";
import { signIn } from "@/auth";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export type CallState = {
  errors?: {
    contactId?: string[];
    status?: string[];
    notes?: string[];
  };
  message: string;
};

export type ContactState = {
  errors?: {
    name?: string[];
    company?: string[];
    phone?: string[];
  };
  message: string;
};

const CallFormSchema = z.object({
  id: z.string(),
  contactId: z.string({
    invalid_type_error: "Please select a contact.",
  }),
  status: z.enum(["return", "pending", "lw"], {
    invalid_type_error: "Please select a call status.",
  }),
  notes: z.string().optional(),
  date: z.string(),
});

const CreateCall = CallFormSchema.omit({ id: true, date: true });
const UpdateCall = CallFormSchema.omit({ id: true, date: true });

const ContactFormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: "Please enter a name.",
  }),
  company: z.string({
    invalid_type_error: "Please enter a company.",
  }),
  phone: z.string({
    invalid_type_error: "Please enter a phone number.",
  }),
});

const CreateContact = ContactFormSchema.omit({ id: true });
const UpdateContact = ContactFormSchema.omit({ id: true });

export async function createCall(
  prevState: CallState | undefined,
  formData: FormData,
) {
  // Validate form using Zod
  const validatedFields = CreateCall.safeParse({
    contactId: formData.get("contactId"),
    status: formData.get("status"),
    notes: formData.get("notes"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Call.",
    };
  }

  // Prepare data for insertion into the database
  const { contactId, status, notes } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO calls (contact_id, status, notes, date)
      VALUES (${contactId}, ${status}, ${notes ?? ""}, ${date})
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

export async function createContact(
  prevState: ContactState | undefined,
  formData: FormData,
) {
  // Validate form using Zod
  const validatedFields = CreateContact.safeParse({
    name: formData.get("name"),
    company: formData.get("company"),
    phone: formData.get("phone"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Call.",
    };
  }

  // Prepare data for insertion into the database
  const { name, company, phone } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO contacts (name, company, phone)
      VALUES (${name}, ${company}, ${phone})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Contact.",
    };
  }

  // Revalidate the cache for the calls page and redirect the user.
  revalidatePath("/contacts");
  redirect("/contacts");
}

export async function updateCall(
  id: string,
  prevState: CallState | undefined,
  formData: FormData,
) {
  const validatedFields = UpdateCall.safeParse({
    contactId: formData.get("contactId"),
    status: formData.get("status"),
    notes: formData.get("notes"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Call.",
    };
  }

  const { contactId, status, notes } = validatedFields.data;

  try {
    await sql`
      UPDATE calls
      SET contact_id = ${contactId}, status = ${status}, notes = ${notes ?? ""}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Call." };
  }

  revalidatePath("/calls");
  redirect("/calls");
}

export async function updateContact(
  id: string,
  prevState: ContactState | undefined,
  formData: FormData,
) {
  const validatedFields = UpdateContact.safeParse({
    name: formData.get("name"),
    company: formData.get("company"),
    phone: formData.get("phone"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Call.",
    };
  }

  const { name, company, phone } = validatedFields.data;

  try {
    await sql`
      UPDATE contacts
      SET name=${name}, company = ${company}, phone = ${phone}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Contact." };
  }

  revalidatePath("/contacts");
  redirect("/contacts");
}

export async function deleteCall(id: string) {
  await sql`DELETE FROM calls WHERE id = ${id}`;
  revalidatePath("/calls");
}

export async function deleteContact(id: string) {
  await sql`DELETE FROM contacts WHERE id = ${id}`;
  revalidatePath("/contacts");
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
