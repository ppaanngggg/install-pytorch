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
    openGraph: {
      title: title,
      description: description,
      url: "https://install.pytorch.site",
      siteName: "Install PyTorch",
      images: [
        {
          url: "https://install.pytorch.site/og.webp",
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
          url: "https://install.pytorch.site/og.webp",
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
