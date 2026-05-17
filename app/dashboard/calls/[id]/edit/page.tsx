import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchCallById, fetchContacts } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/calls/breadcrumbs";
import Form from "@/app/ui/calls/edit-form";

export const metadata: Metadata = {
  title: "Edit Call",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const [call, contacts] = await Promise.all([
    fetchCallById(id),
    fetchContacts(),
  ]);

  if (!call) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Calls", href: "/dashboard/calls" },
          {
            label: "Edit Call",
            href: `/dashboard/calls/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form call={call} contacts={contacts} />
    </main>
  );
}
