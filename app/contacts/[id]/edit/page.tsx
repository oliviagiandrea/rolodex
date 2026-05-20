import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchContactById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Form from "@/app/ui/contacts/edit-form";

export const metadata: Metadata = {
  title: "Edit Contact",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const contact = await fetchContactById(id);

  if (!contact) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Contacts", href: "/contacts" },
          {
            label: "Edit Contact",
            href: `/contacts/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form contact={contact} />
    </main>
  );
}
