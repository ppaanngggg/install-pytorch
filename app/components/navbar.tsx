import Link from "next/link";
import Image from "next/image";
import Search from "@/app/components/search";

export default function Navbar(props: {
  device: string | undefined;
  python: string | undefined;
  os: string | undefined;
  arch: string | undefined;
}) {
  return (
    <header className="navbar header-background flex-col">
      <Link href="/">
        <Image
          src={"/static/icon.webp"}
          alt="install pytorch logo"
          width={48}
          height={48}
        />
        <h1 className="text-4xl text-white btn btn-ghost my-6">
          Install PyTorch
        </h1>
      </Link>
      <h2 className="font-semibold text-white">
        Select your CUDA, ROCm, Python and OS to find PyTorch version you need.
      </h2>
      <Search
        device={props.device}
        python={props.python}
        os={props.os}
        arch={props.arch}
      />
      <div className="absolute top-2 right-2">
        <Link href="mailto:hantian.pang@gmail.com">
          <Image
            src="/static/email.svg"
            alt="emailme"
            width={36}
            height={36}
            className="pr-2"
          />
        </Link>
        <Link
          href="https://github.com/ppaanngggg/install-pytorch"
          rel="noopener ugc nofollow"
          target="_blank"
        >
          <Image src="/static/github.svg" alt="github" width={24} height={24} />
        </Link>
        <Link
          href="https://buymeacoffee.com/ppaanngggg"
          rel="noopener ugc nofollow"
          target="_blank"
        >
          <Image
            src="/static/bmc.svg"
            alt="buymeacoffee"
            width={40}
            height={40}
          />
        </Link>
        <Link
          href="https://ko-fi.com/ppaanngggg"
          rel="noopener ugc nofollow"
          target="_blank"
        >
          <Image src="/static/ko-fi.svg" alt="ko-fi" width={30} height={30} />
        </Link>
      </div>
    </header>
  );
}
