export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Call = {
  id: string;
  contact_id: string;
  amount: number;
  date: string;
  status: "pending" | "return" | "lw";
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestCall = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestCallRaw = Omit<LatestCall, "amount"> & {
  amount: number;
};

export type CallsTable = {
  id: string;
  contact_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: "pending" | "return" | "lw";
};

export type ContactsTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_calls: number;
  total_pending: number;
  total_return: number;
  total_lw: number;
};

export type FormattedContactsTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_calls: number;
  total_pending: string;
  total_return: string;
  total_lw: string;
};

export type ContactField = {
  id: string;
  name: string;
};

export type CallForm = {
  id: string;
  contact_id: string;
  amount: number;
  status: "pending" | "return" | "lw";
};
