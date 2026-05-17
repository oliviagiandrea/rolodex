import Image from "next/image";
import { fetchFilteredCalls } from "@/app/lib/data";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
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
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={call.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${call.name}'s profile picture`}
                      />
                      <p>{call.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{call.email}</p>
                  </div>
                  <CallStatus status={call.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(call.amount)}
                    </p>
                    <p>{formatDateToLocal(call.date)}</p>
                  </div>
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
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Contact
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
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
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={call.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${call.name}'s profile picture`}
                      />
                      <p>{call.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{call.email}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(call.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(call.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <CallStatus status={call.status} />
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
