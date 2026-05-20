import { Metadata } from "next";
import { Suspense } from "react";
import { fetchContactsPages } from "@/app/lib/data";
import { CreateContact } from "@/app/ui/contacts/buttons";
import Table from "@/app/ui/contacts/table";
import { lusitana } from "@/app/ui/fonts";
import Pagination from "@/app/ui/pagination";
import Search from "@/app/ui/search";
import { CallsTableSkeleton } from "@/app/ui/skeletons";

export const metadata: Metadata = {
  title: "Contacts",
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchContactsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Contacts</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search contacts..." />
        <CreateContact />
      </div>
      <Suspense key={query + currentPage} fallback={<CallsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
