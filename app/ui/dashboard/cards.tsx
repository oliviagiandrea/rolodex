import { fetchCardData } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";
import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
  return: BanknotesIcon,
  contacts: UserGroupIcon,
  pending: ClockIcon,
  calls: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfCalls,
    numberOfContacts,
    totalReturnCalls,
    totalPendingCalls,
    totalLWCalls,
  } = await fetchCardData();

  return (
    <>
      <Card title="Return" value={totalReturnCalls} type="return" />
      <Card title="Pending" value={totalPendingCalls} type="pending" />
      <Card title="Total Calls" value={numberOfCalls} type="calls" />
      <Card title="Total Contacts" value={numberOfContacts} type="contacts" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "calls" | "contacts" | "pending" | "return";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
