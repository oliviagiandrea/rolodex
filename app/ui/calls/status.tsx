import clsx from "clsx";
import {
  ArrowPathIcon,
  BoltIcon,
  CheckIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function CallStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-yellow-100 text-yellow-700": status === "pending",
          "bg-emerald-500 text-white": status === "return",
          "bg-indigo-500 text-white": status === "lw",
        },
      )}
    >
      {status === "pending" ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === "return" ? (
        <>
          Return
          <ArrowPathIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === "lw" ? (
        <>
          LW
          <BoltIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
