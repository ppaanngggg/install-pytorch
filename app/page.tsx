import Table from "@/app/components/table";
import { Record, records } from "@/app/utils/data";
import { Suspense } from "react";
import Continue from "@/app/components/continue";
import { Metadata } from "next";

type Props = {
  searchParams: {
    device?: string;
    python?: string;
    os?: string;
    arch?: string;
    limit?: number;
  };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const filters: string[] = [];
  searchParams.device?.length && filters.push(searchParams.device);
  searchParams.python?.length && filters.push(searchParams.python);
  searchParams.os?.length && filters.push(searchParams.os);
  searchParams.arch?.length && filters.push(searchParams.arch);

  let title = "Install PyTorch on any Device, Python, OS, and Architecture";
  if (filters.length) {
    title = `Install PyTorch on ${filters.join(", ")}`;
  }

  return {
    title: title,
    description:
      title + ". Download the wheel directly or copy pip install cmdline.",
    verification: { google: "JXQ1K9hsRtt0tAXhGDnZ04Trr3sMBxQA-tO3T1WznzY" },
    metadataBase: new URL("https://install.pytorch.site"),
    alternates: {
      canonical: "/",
    },
  };
}

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

export default function Home({ searchParams }: Props) {
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
      <Table records={filteredRecord} />
      {isContinue && (
        <Suspense>
          <Continue />
        </Suspense>
      )}
      <div className="my-4" />
    </main>
  );
}
