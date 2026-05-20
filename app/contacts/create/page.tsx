import { Metadata } from "next";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Form from "@/app/ui/contacts/create-form";

export const metadata: Metadata = {
  title: "Create Contact",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Contacts", href: "/contacts" },
          {
            label: "Create Contact",
            href: "/contacts/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
