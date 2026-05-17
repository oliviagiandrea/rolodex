import postgres from "postgres";
import {
  ContactField,
  ContactsTableType,
  CallForm,
  CallsTable,
} from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredCalls(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const calls = await sql<CallsTable[]>`
      SELECT
        calls.id,
        calls.date,
        calls.status,
        calls.notes,
        contacts.name,
        contacts.company,
        contacts.phone
      FROM calls
      JOIN contacts ON calls.contact_id = contacts.id
      WHERE
        contacts.name ILIKE ${`%${query}%`} OR
        contacts.company ILIKE ${`%${query}%`} OR
        contacts.phone ILIKE ${`%${query}%`} OR
        calls.date::text ILIKE ${`%${query}%`} OR
        calls.notes::text ILIKE ${`%${query}%`} OR
        calls.status ILIKE ${`%${query}%`}
      ORDER BY calls.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return calls;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch calls.");
  }
}

export async function fetchCallsPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM calls
    JOIN contacts ON calls.contact_id = contacts.id
    WHERE
      contacts.name ILIKE ${`%${query}%`} OR
      contacts.company ILIKE ${`%${query}%`} OR
      contacts.phone ILIKE ${`%${query}%`} OR
      calls.date::text ILIKE ${`%${query}%`} OR
      calls.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of calls.");
  }
}

export async function fetchCallById(id: string) {
  try {
    const calls = await sql<CallForm[]>`
      SELECT
        calls.id,
        calls.contact_id,
        calls.status
      FROM calls
      WHERE calls.id = ${id};
    `;

    return calls[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch call.");
  }
}

export async function fetchContacts() {
  try {
    const contacts = await sql<ContactField[]>`
      SELECT
        id,
        name,
        company,
        phone
      FROM contacts
      ORDER BY name ASC
    `;

    return contacts;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all contacts.");
  }
}

export async function fetchContactsPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM contacts
    WHERE
      contacts.name ILIKE ${`%${query}%`} OR
      contacts.company ILIKE ${`%${query}%`} OR
      contacts.phone ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of calls.");
  }
}

export async function fetchFilteredContacts(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<ContactsTableType[]>`
		SELECT
		  contacts.id,
		  contacts.name,
      contacts.company,
		  contacts.phone
		FROM contacts
		WHERE
		  contacts.name ILIKE ${`%${query}%`} OR
      contacts.company ILIKE ${`%${query}%`} OR
      contacts.phone ILIKE ${`%${query}%`}
		ORDER BY contacts.name ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;

    return data;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch contact table.");
  }
}
