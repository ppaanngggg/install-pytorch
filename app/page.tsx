import Table from "@/app/components/table";
import Search from "@/app/components/search";
import { records } from "@/app/utils/records";
import { Suspense } from "react";

// define a structure for the data

export default function Home({
  searchParams,
}: {
  searchParams?: {
    device?: string;
    python?: string;
    os?: string;
    arch?: string;
  };
}) {
  const device = searchParams?.device || null;
  const python = searchParams?.python || null;
  const os = searchParams?.os || null;
  const arch = searchParams?.arch || null;

  return (
    <main className="flex flex-col min-h-screen items-center">
      <h1 className="text-7xl m-10">PyTorch</h1>
      <div className="flex flex-col w-full items-center">
        <Suspense>
          <Search records={records} />
        </Suspense>
      </div>
      <div className="divider divider-text"></div>
      <Table device={device} python={python} os={os} arch={arch} />
    </main>
  );
}
