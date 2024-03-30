import Table from "@/app/components/table";
import Search from "@/app/components/search";
import { labels, Record, records } from "@/app/utils/data";
import { Suspense } from "react";
import Image from "next/image";
import Continue from "@/app/components/continue";

function filterRecords(
  records: Record[],
  device: string | null,
  python: string | null,
  os: string | null,
  arch: string | null,
  limit: number,
): [Record[], boolean] {
  const ret: Record[] = [];
  // iter and filter records to ret, early stop at limit
  for (let record of records) {
    if (
      (device === null || record.device === device) &&
      (python === null || record.python === python) &&
      (os === null || record.os === os) &&
      (arch === null || record.arch === arch)
    ) {
      ret.push(record);
      if (ret.length >= limit) {
        return [ret, true];
      }
    }
  }
  return [ret, false];
}

export default function Home({
  searchParams,
}: {
  searchParams?: {
    device?: string;
    python?: string;
    os?: string;
    arch?: string;
    limit?: number;
  };
}) {
  const device = searchParams?.device || null;
  const python = searchParams?.python || null;
  const os = searchParams?.os || null;
  const arch = searchParams?.arch || null;
  const limit = searchParams?.limit || 100;
  const [filteredRecord, isContinue] = filterRecords(
    records,
    device,
    python,
    os,
    arch,
    limit,
  );

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
          <Search label={labels} />
        </Suspense>
      </div>
      <div className="divider"></div>
      <Table records={filteredRecord} />
      {isContinue && (
        <Suspense>
          <Continue />
        </Suspense>
      )}
    </main>
  );
}
