// import postgres from 'postgres';

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// async function listCalls() {
// 	const data = await sql`
//     SELECT calls.amount, contacts.name
//     FROM calls
//     JOIN contacts ON calls.contact_id = contacts.id
//     WHERE calls.amount = 666;
//   `;

// 	return data;
// }

export async function GET() {
  return Response.json({
    message:
      "Uncomment this file and remove this line. You can delete this file when you are finished.",
  });
  // try {
  // 	return Response.json(await listCalls());
  // } catch (error) {
  // 	return Response.json({ error }, { status: 500 });
  // }
}
