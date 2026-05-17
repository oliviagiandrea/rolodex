const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "Nicky",
    email: "nicky@gmail.com",
    password: "123456",
  },
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442b",
    name: "Cayla",
    email: "cayla@gmail.com",
    password: "123456",
  },
];

const contacts = [
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: "Evil Rabbit",
    company: "Shadow Tech",
    phone: "(415) 555-0198",
  },
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    name: "Delba de Oliveira",
    email: "delba@oliveira.com",
    company: "Oliveira Consulting",
    phone: "(212) 555-0142",
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    name: "Lee Robinson",
    email: "lee@robinson.com",
    company: "Robinson Ventures",
    phone: "(312) 555-0175",
  },
  {
    id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
    name: "Michael Novotny",
    email: "michael@novotny.com",
    company: "Novotny Studios",
    phone: "(646) 555-0123",
  },
  {
    id: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9",
    name: "Amy Burns",
    email: "amy@burns.com",
    company: "Burns & Co.",
    phone: "(415) 555-0166",
  },
  {
    id: "13D07535-C59E-4157-A011-F8D2EF4E0CBB",
    name: "Balazs Orban",
    email: "balazs@orban.com",
    company: "Orban Analytics",
    phone: "(212) 555-0180",
  },
];

const calls = [
  {
    contact_id: contacts[0].id,
    status: "pending",
    date: "2026-01-06",
    notes: "Discussing streaming rights for new Netflix sci-fi pitch.",
  },
  {
    contact_id: contacts[1].id,
    status: "pending",
    date: "2026-01-14",
    notes: "",
  },
  {
    contact_id: contacts[4].id,
    status: "return",
    date: "2026-01-29",
    notes: "Reviewing Paramount options for XYZ project.",
  },
  {
    contact_id: contacts[3].id,
    status: "return",
    date: "2026-02-10",
    notes: "Preparing studio notes for rights bid on feature license.",
  },
  {
    contact_id: contacts[5].id,
    status: "pending",
    date: "2026-02-05",
    notes: "",
  },
  {
    contact_id: contacts[2].id,
    status: "pending",
    date: "2026-02-16",
    notes: "Deal points for branded content license.",
  },
  {
    contact_id: contacts[0].id,
    status: "pending",
    date: "2026-03-27",
    notes: "",
  },
  {
    contact_id: contacts[3].id,
    status: "return",
    date: "2026-03-09",
    notes: "",
  },
  {
    contact_id: contacts[4].id,
    status: "lw",
    date: "2026-03-17",
    notes: "Following up on licensing terms for cable adaptation.",
  },
  {
    contact_id: contacts[5].id,
    status: "lw",
    date: "2026-04-07",
    notes: "",
  },
  {
    contact_id: contacts[1].id,
    status: "return",
    date: "2026-04-19",
    notes: "Discussing licensing clauses for pilot.",
  },
  {
    contact_id: contacts[5].id,
    status: "lw",
    date: "2026-04-03",
    notes: "",
  },
  {
    contact_id: contacts[2].id,
    status: "lw",
    date: "2026-05-05",
    notes: "",
  },
];

export { users, contacts, calls };
