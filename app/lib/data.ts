import postgres from "postgres";
import {
  ContactField,
  ContactsTableType,
  CallForm,
  CallsTable,
  LatestCall,
  Revenue,
} from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchRevenue() {
  try {
    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchLatestCalls() {
  try {
    const data = await sql<LatestCall[]>`
      SELECT contacts.name, contacts.image_url, contacts.email, calls.id
      FROM calls
      JOIN contacts ON calls.contact_id = contacts.id
      ORDER BY calls.date DESC
      LIMIT 5`;

    const latestCalls = data.map((call) => ({
      ...call,
    }));
    return latestCalls;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest calls.");
  }
}

export async function fetchCardData() {
  try {
    const callCountPromise = sql`SELECT COUNT(*) FROM calls`;
    const contactCountPromise = sql`SELECT COUNT(*) FROM contacts`;
    const callStatusPromise = sql`SELECT
      COUNT(CASE WHEN status = 'return' THEN 1 END) AS "return",
      COUNT(CASE WHEN status = 'pending' THEN 1 END) AS "pending",
      COUNT(CASE WHEN status = 'lw' THEN 1 END) AS "lw"
      FROM calls`;

    const data = await Promise.all([
      callCountPromise,
      contactCountPromise,
      callStatusPromise,
    ]);

    const numberOfCalls = Number(data[0][0].count ?? "0");
    const numberOfContacts = Number(data[1][0].count ?? "0");
    const totalReturnCalls = Number(data[2][0].return ?? 0);
    const totalPendingCalls = Number(data[2][0].pending ?? 0);
    const totalLWCalls = Number(data[2][0].lw ?? 0);

    return {
      numberOfContacts,
      numberOfCalls,
      totalReturnCalls,
      totalPendingCalls,
      totalLWCalls,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredCalls(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const calls = await sql<CallsTable[]>`
      SELECT
        calls.id,
        calls.date,
        calls.status,
        contacts.name,
        contacts.email,
        contacts.image_url
      FROM calls
      JOIN contacts ON calls.contact_id = contacts.id
      WHERE
        contacts.name ILIKE ${`%${query}%`} OR
        contacts.email ILIKE ${`%${query}%`} OR
        calls.date::text ILIKE ${`%${query}%`} OR
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
      contacts.email ILIKE ${`%${query}%`} OR
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
    const data = await sql<CallForm[]>`
      SELECT
        calls.id,
        calls.contact_id,
        calls.status
      FROM calls
      WHERE calls.id = ${id};
    `;

    const call = data.map((call) => ({
      ...call,
    }));

    return call[0];
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
        name
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
      contacts.email ILIKE ${`%${query}%`}
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
		  contacts.email,
		  contacts.image_url,
		  COUNT(calls.id) AS total_calls,
		  COUNT(CASE WHEN calls.status = 'pending' THEN 1 END) AS total_pending,
      COUNT(CASE WHEN calls.status = 'return' THEN 1 END) AS total_return,
      COUNT(CASE WHEN calls.status = 'lw' THEN 1 END) AS total_lw
		FROM contacts
		LEFT JOIN calls ON contacts.id = calls.contact_id
		WHERE
		  contacts.name ILIKE ${`%${query}%`} OR
        contacts.email ILIKE ${`%${query}%`}
		GROUP BY contacts.id, contacts.name, contacts.email, contacts.image_url
		ORDER BY contacts.name ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;

    const contacts = data.map((contact) => ({
      ...contact,
      total_pending: Number(contact.total_pending ?? 0),
      total_return: Number(contact.total_return ?? 0),
      total_lw: Number(contact.total_lw ?? 0),
    }));

    return contacts;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch contact table.");
  }
}
