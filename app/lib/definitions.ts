export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Contact = {
  id: string;
  name: string;
  company: string;
  phone: string;
  notes: string;
};

export type Call = {
  id: string;
  contact_id: string;
  notes: string;
  date: string;
  status: "pending" | "return" | "lw";
};

export type CallsTable = {
  id: string;
  contact_id: string;
  name: string;
  company: string;
  phone: string;
  notes: string;
  date: string;
  status: "pending" | "return" | "lw";
};

export type ContactsTableType = {
  id: string;
  name: string;
  company: string;
  phone: string;
  notes: string;
};

export type FormattedContactsTable = {
  id: string;
  name: string;
  company: string;
  phone: string;
  notes: string;
};

export type ContactField = {
  id: string;
  name: string;
  company: string;
  phone: string;
  notes: string;
};

export type CallForm = {
  id: string;
  contact_id: string;
  name: string;
  company: string;
  phone: string;
  status: "pending" | "return" | "lw";
  notes: string;
};
