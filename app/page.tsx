import Table from "@/app/components/table";
import Search from "@/app/components/search";
import { records } from "@/app/utils/records";
import { Suspense } from "react";
import Image from "next/image";

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
      <div className="flex flex-row items-center">
        <Image
          src={"/pytorch_logo.png"}
          alt="pytorch logo"
          width={72}
          height={72}
        />
        <h1 className="text-6xl m-10">Install PyTorch</h1>
      </div>
      <div className="flex flex-col w-full items-center">
        <Suspense>
          <Search records={records} />
        </Suspense>
      </div>
      <div className="divider divider-text"></div>
      <Table device={device} python={python} os={os} arch={arch} />
      <div className="divider divider-text"></div>
    </main>
  );
}
