import Table from "@/app/components/table";
import { Record, records } from "@/app/utils/data";
import { Suspense } from "react";
import Continue from "@/app/components/continue";
import { Metadata } from "next";
import Search from "@/app/components/search";
import Image from "next/image";
import Link from "next/link";
import FAQ from "@/app/components/faq";

type Props = {
  searchParams: {
    device: string | null;
    python: string | null;
    os: string | null;
    arch: string | null;
    limit: number | null;
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
  const description =
    title + ". Download the wheel directly or copy pip install cmdline.";

  return {
    title: title,
    description: description,
    verification: { google: "JXQ1K9hsRtt0tAXhGDnZ04Trr3sMBxQA-tO3T1WznzY" },
    metadataBase: new URL("https://install.pytorch.site"),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: title,
      description: description,
      url: "https://install.pytorch.site",
      siteName: "Install PyTorch",
      images: [
        {
          url: "https://install.pytorch.site/screenshot.webp",
          width: 1308,
          height: 816,
          alt: "Install PyTorch",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      creator: "@HantianPang",
      creatorId: "1767790642477060096",
      images: [
        {
          url: "https://install.pytorch.site/screenshot.webp",
          alt: "Install PyTorch",
        },
      ],
    },
  };
}

function filterRecords(
  records: Record[],
  device: string | null,
  python: string | null,
  os: string | null,
  arch: string | null,
  limit: number | null,
): [Record[], boolean] {
  if (limit === null) {
    limit = 100;
  }
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
  const limit = searchParams?.limit || null;
  const [filteredRecord, isContinue] = filterRecords(
    records,
    device,
    python,
    os,
    arch,
    limit,
  );

  return (
    <div className="flex flex-col min-h-screen items-center">
      <header className="header-background flex flex-col items-center w-full">
        <Link href="/">
          <div className="flex flex-row items-center my-6">
            <Image
              src={"/install.pytorch.webp"}
              alt="pytorch logo"
              width={72}
              height={72}
            />
            <h1 className="text-5xl mx-10 bg-blend-color text-white">
              Install PyTorch
            </h1>
          </div>
        </Link>
        <h2 className="text-lg font-semibold text-white">
          Select your CUDA, ROCm, Python and OS to find PyTorch version you
          need.
        </h2>
        <div className="flex flex-col w-full items-center my-5">
          <Search
            device={device}
            python={python}
            os={os}
            arch={arch}
            limit={limit}
          />
        </div>
      </header>
      <main className="flex flex-col items-center w-full mb-auto bg-purple-50 py-5">
        <Table records={filteredRecord} />
        {isContinue && (
          <Suspense>
            <Continue />
          </Suspense>
        )}
      </main>
      <FAQ />
      <footer className="flex flex-col items-center justify-center w-full footer-background text-white botto">
        <div className="my-2" />
        <div className="flex flex-row w-9/12 max-w-5xl justify-center my-2">
          <Link href="https://github.com/ppaanngggg/install-pytorch">
            <svg
              height="24"
              aria-hidden="true"
              viewBox="0 0 16 16"
              version="1.1"
              width="24"
              data-view-component="true"
              className="octicon octicon-mark-github v-align-middle color-fg-default"
            >
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
          </Link>
        </div>
        <div className="flex flex-row items-right justify-center my-2">
          <span className="font-semibold text-xs">© 2024 Install PyTorch</span>
        </div>
        <div className="my-2" />
      </footer>
    </div>
  );
}
