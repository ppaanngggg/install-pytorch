import Table from "@/app/components/table";
import { Metadata } from "next";
import FAQ from "@/app/components/faq";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

type Props = {
  searchParams: {
    device: string | undefined;
    python: string | undefined;
    os: string | undefined;
    arch: string | undefined;
    page: string | undefined;
  };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  let mainFilter: string | undefined = undefined;
  let mainFilterType: string | undefined = undefined;
  if (searchParams.device?.length) {
    mainFilter = searchParams.device;
    mainFilterType = "device";
  } else if (searchParams.python?.length) {
    mainFilter = searchParams.python;
    mainFilterType = "python";
  } else if (searchParams.os?.length) {
    mainFilter = searchParams.os;
    mainFilterType = "os";
  } else if (searchParams.arch?.length) {
    mainFilter = searchParams.arch;
    mainFilterType = "arch";
  }

  const baseUrl = "https://install.pytorch.site";
  let title = "Install PyTorch - Find the right torch version";
  let description =
    "Filter by CUDA, ROCm, Python, or your operating system to find the specific version of PyTorch you need. " +
    "Either copy the pip install command-line instruction or download the .whl file directly.";
  if (mainFilter && mainFilterType) {
    title = `${mainFilter} | Install PyTorch`;
    description =
      `List all PyTorch versions that support ${mainFilter}. Find the right version you need. ` +
      `Either copy the pip install command-line instruction or download the .whl file directly.`;
    const params = new URLSearchParams();
    params.set(mainFilterType, mainFilter);
  }

  return {
    metadataBase: new URL(baseUrl),
    title: title,
    description: description,
    verification: {
      google: "JXQ1K9hsRtt0tAXhGDnZ04Trr3sMBxQA-tO3T1WznzY",
      yandex: "7d96170a903cd57e",
    },
    openGraph: {
      title: title,
      description: description,
      url: baseUrl,
      siteName: "Install PyTorch",
      images: [
        {
          url: `${baseUrl}/static/og.webp`,
          alt: "Install PyTorch",
          width: 1270,
          height: 760,
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
          url: `${baseUrl}/static/og.webp`,
          alt: "Install PyTorch",
        },
      ],
    },
  };
}

export default function Home({ searchParams }: Props) {
  let page: number = 1;
  if (searchParams.page) {
    page = parseInt(searchParams.page);
  }
  return (
    <>
      <Navbar
        device={searchParams.device}
        python={searchParams.python}
        os={searchParams.os}
        arch={searchParams.arch}
      />
      <main className="flex flex-col items-center">
        <Table
          device={searchParams.device}
          python={searchParams.python}
          os={searchParams.os}
          arch={searchParams.arch}
          page={page}
        />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
