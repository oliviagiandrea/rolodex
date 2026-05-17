import { fetchFilteredCalls } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";
import { UpdateCall, DeleteCall } from "@/app/ui/calls/buttons";
import CallStatus from "@/app/ui/calls/status";

export default async function CallsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const calls = await fetchFilteredCalls(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {calls?.map((call) => (
              <div
                key={call.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex flex-col gap-3 border-b pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-medium text-gray-900">
                      {formatDateToLocal(call.date)}
                    </p>
                    <CallStatus status={call.status} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-gray-900">{call.name}</p>
                    <p className="text-sm text-gray-500">{call.company}</p>
                    <p className="text-sm text-gray-500">{call.phone}</p>
                    {call.notes ? (
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {call.notes}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateCall id={call.id} />
                    <DeleteCall id={call.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Contact
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Company
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Phone Number
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Notes
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {calls?.map((call) => (
                <tr
                  key={call.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(call.date)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center">
                      <p>{call.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {call.company}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{call.phone}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <CallStatus status={call.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p className="max-w-[20rem] truncate text-sm text-gray-500">
                      {call.notes}
                    </p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCall id={call.id} />
                      <DeleteCall id={call.id} />
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
