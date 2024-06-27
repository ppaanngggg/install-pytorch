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
      <a href="/">
        <div className="flex btn btn-ghost my-4 space-x-2">
          <Image
            src={"/static/icon.webp"}
            alt="install pytorch logo"
            width={48}
            height={48}
          />
          <h1 className="text-4xl text-white">Install PyTorch</h1>
        </div>
      </a>
      <h2 className="font-semibold text-white">
        Your one-stop solution for easy PyTorch installation.
      </h2>
      <Search
        device={props.device}
        python={props.python}
        os={props.os}
        arch={props.arch}
      />
      <div className="absolute top-2 right-2">
        <a href="mailto:hantian.pang@gmail.com">
          <Image
            src="/static/email.svg"
            alt="emailme"
            width={36}
            height={36}
            className="pr-2"
          />
        </a>
        <a
          href="https://github.com/ppaanngggg/install-pytorch"
          rel="noopener ugc nofollow"
          target="_blank"
        >
          <Image src="/static/github.svg" alt="github" width={24} height={24} />
        </a>
        <a
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
        </a>
        <a
          href="https://ko-fi.com/ppaanngggg"
          rel="noopener ugc nofollow"
          target="_blank"
        >
          <Image src="/static/ko-fi.svg" alt="ko-fi" width={30} height={30} />
        </a>
      </div>
    </header>
  );
}
