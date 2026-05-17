import bcrypt from "bcrypt";
import postgres from "postgres";
import { calls, contacts, users } from "../lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedCalls() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS calls (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      contact_id UUID NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedCalls = await Promise.all(
    calls.map(
      (call) => sql`
        INSERT INTO calls (contact_id, status, date)
        VALUES (${call.contact_id}, ${call.status}, ${call.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedCalls;
}

async function seedContacts() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL
    );
  `;

  const insertedContacts = await Promise.all(
    contacts.map(
      (contact) => sql`
        INSERT INTO contacts (id, name, email)
        VALUES (${contact.id}, ${contact.name}, ${contact.email})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedContacts;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      seedUsers(),
      seedContacts(),
      seedCalls(),
    ]);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
