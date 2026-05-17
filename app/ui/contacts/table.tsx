import Image from "next/image";
import { fetchFilteredContacts } from "@/app/lib/data";

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
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {contacts?.map((contact) => (
                <div
                  key={contact.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <div className="flex items-center gap-3">
                          <Image
                            src={contact.image_url}
                            className="rounded-full"
                            alt={`${contact.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                          <p>{contact.name}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{contact.email}</p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between border-b py-5">
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Pending</p>
                      <p className="font-medium">{contact.total_pending}</p>
                    </div>
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">Return</p>
                      <p className="font-medium">{contact.total_return}</p>
                    </div>
                    <div className="flex w-1/2 flex-col">
                      <p className="text-xs">LW</p>
                      <p className="font-medium">{contact.total_lw}</p>
                    </div>
                  </div>
                  <div className="pt-4 text-sm">
                    <p>{contact.total_calls} calls</p>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full rounded-md text-gray-900 md:table">
              <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Total Calls
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Total Pending
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Total Return
                  </th>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Total LW
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-gray-900">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="group">
                    <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                      <div className="flex items-center gap-3">
                        <Image
                          src={contact.image_url}
                          className="rounded-full"
                          alt={`${contact.name}'s profile picture`}
                          width={28}
                          height={28}
                        />
                        <p>{contact.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {contact.email}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {contact.total_calls}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                      {contact.total_pending}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                      {contact.total_return}
                    </td>
                    <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                      {contact.total_lw}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
