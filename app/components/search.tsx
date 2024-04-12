import { labels } from "@/app/utils/data";
import { clsx } from "clsx";
import Link from "next/link";

export default function Search(props: {
  device: string | null;
  python: string | null;
  os: string | null;
  arch: string | null;
  limit: number | null;
}) {
  const curSearchParams = new URLSearchParams();
  props.device && curSearchParams.set("device", props.device);
  props.python && curSearchParams.set("python", props.python);
  props.os && curSearchParams.set("os", props.os);
  props.arch && curSearchParams.set("arch", props.arch);
  props.limit && curSearchParams.set("limit", props.limit.toString());

  function buildUrl(
    device: string | null,
    python: string | null,
    os: string | null,
    arch: string | null,
  ): string {
    const newSearchParams = new URLSearchParams(curSearchParams);
    if (device) {
      if (device === props.device) {
        newSearchParams.delete("device");
      } else {
        newSearchParams.set("device", device);
      }
    }
    if (python) {
      if (python === props.python) {
        newSearchParams.delete("python");
      } else {
        newSearchParams.set("python", python);
      }
    }
    if (os) {
      if (os === props.os) {
        newSearchParams.delete("os");
      } else {
        newSearchParams.set("os", os);
      }
    }
    if (arch) {
      if (arch === props.arch) {
        newSearchParams.delete("arch");
      } else {
        newSearchParams.set("arch", arch);
      }
    }
    return "?" + newSearchParams.toString();
  }

  return (
    <div className="flex flex-col w-9/12 max-w-5xl space-y-1">
      <div className="flex flex-wrap justify-center items-center">
        {labels.device.map((device) => (
          <Link key={device} href={buildUrl(device, null, null, null)}>
            <button
              className={clsx(
                "btn btn-xs m-0.5",
                {
                  "btn-info": device.startsWith("CPU"),
                  "btn-success": device.startsWith("CUDA"),
                  "btn-error": device.startsWith("ROCm"),
                },
                { "btn-outline": device == props.device },
              )}
            >
              {device}
            </button>
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {labels.python.map((python) => (
          <Link key={python} href={buildUrl(null, python, null, null)}>
            <button
              className={clsx("btn btn-xs m-0.5 btn-primary", {
                "btn-outline": python == props.python,
              })}
            >
              {python}
            </button>
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {labels.os.map((os) => (
          <Link key={os} href={buildUrl(null, null, os, null)}>
            <button
              className={clsx("btn btn-xs m-0.5", {
                "btn-outline": os == props.os,
              })}
            >
              {os}
            </button>
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {labels.arch.map((arch) => (
          <Link key={arch} href={buildUrl(null, null, null, arch)}>
            <button
              className={clsx("btn btn-xs m-0.5 btn-warning", {
                "btn-outline": arch == props.arch,
              })}
            >
              {arch}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
