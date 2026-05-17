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
    email: "evil@rabbit.com",
  },
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    name: "Delba de Oliveira",
    email: "delba@oliveira.com",
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    name: "Lee Robinson",
    email: "lee@robinson.com",
  },
  {
    id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
    name: "Michael Novotny",
    email: "michael@novotny.com",
  },
  {
    id: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9",
    name: "Amy Burns",
    email: "amy@burns.com",
  },
  {
    id: "13D07535-C59E-4157-A011-F8D2EF4E0CBB",
    name: "Balazs Orban",
    email: "balazs@orban.com",
  },
];

const calls = [
  {
    contact_id: contacts[0].id,
    status: "pending",
    date: "2022-12-06",
  },
  {
    contact_id: contacts[1].id,
    status: "pending",
    date: "2022-11-14",
  },
  {
    contact_id: contacts[4].id,
    status: "return",
    date: "2022-10-29",
  },
  {
    contact_id: contacts[3].id,
    status: "return",
    date: "2023-09-10",
  },
  {
    contact_id: contacts[5].id,
    status: "pending",
    date: "2023-08-05",
  },
  {
    contact_id: contacts[2].id,
    status: "pending",
    date: "2023-07-16",
  },
  {
    contact_id: contacts[0].id,
    status: "pending",
    date: "2023-06-27",
  },
  {
    contact_id: contacts[3].id,
    status: "return",
    date: "2023-06-09",
  },
  {
    contact_id: contacts[4].id,
    status: "lw",
    date: "2023-06-17",
  },
  {
    contact_id: contacts[5].id,
    status: "lw",
    date: "2023-06-07",
  },
  {
    contact_id: contacts[1].id,
    status: "return",
    date: "2023-08-19",
  },
  {
    contact_id: contacts[5].id,
    status: "lw",
    date: "2023-06-03",
  },
  {
    contact_id: contacts[2].id,
    status: "lw",
    date: "2022-06-05",
  },
];

export { users, contacts, calls };
