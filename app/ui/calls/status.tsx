import clsx from "clsx";
import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function CallStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-500": status === "pending",
          "bg-green-500 text-white": status === "return",
          "bg-blue-500 text-white": status === "lw",
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
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === "lw" ? (
        <>
          LW
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
