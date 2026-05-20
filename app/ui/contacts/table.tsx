import { fetchFilteredContacts } from "@/app/lib/data";
import { UpdateContact, DeleteContact } from "@/app/ui/contacts/buttons";

export default async function ContactsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const contacts = await fetchFilteredContacts(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {contacts?.map((contact) => (
              <div
                key={contact.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex flex-col gap-3 border-b pb-4">
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">
                      {contact.name}
                    </p>
                    <p className="text-sm text-gray-500">{contact.company}</p>
                    <p className="text-sm text-gray-500">{contact.phone}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateContact id={contact.id} />
                    <DeleteContact id={contact.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Company
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Phone Number
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {contacts?.map((contact) => (
                <tr
                  key={contact.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center">
                      <p>{contact.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contact.company}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {contact.phone}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateContact id={contact.id} />
                      <DeleteContact id={contact.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
