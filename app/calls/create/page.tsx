import { Metadata } from "next";
import { fetchContacts } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/calls/breadcrumbs";
import Form from "@/app/ui/calls/create-form";

export const metadata: Metadata = {
  title: "Create Call",
};

export default async function Page() {
  const contacts = await fetchContacts();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Calls", href: "/calls" },
          {
            label: "Create Call",
            href: "/calls/create",
            active: true,
          },
        ]}
      />
      <Form contacts={contacts} />
    </main>
  );
}
