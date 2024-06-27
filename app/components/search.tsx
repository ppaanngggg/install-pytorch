import { labels } from "@/app/utils/data";
import { clsx } from "clsx";

export default function Search(props: {
  device: string | undefined;
  python: string | undefined;
  os: string | undefined;
  arch: string | undefined;
}) {
  const curSearchParams = new URLSearchParams();
  props.device && curSearchParams.set("device", props.device);
  props.python && curSearchParams.set("python", props.python);
  props.os && curSearchParams.set("os", props.os);
  props.arch && curSearchParams.set("arch", props.arch);

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
    <div className="w-[60rem] max-w-full p-2 flex flex-col space-y-1">
      <div className="flex flex-wrap justify-center items-center">
        {labels.device.map((device) => (
          <a
            key={device}
            href={buildUrl(device, null, null, null)}
            rel="nofollow"
          >
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
          </a>
        ))}
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {labels.python.map((python) => (
          <a
            key={python}
            href={buildUrl(null, python, null, null)}
            rel="nofollow"
          >
            <button
              className={clsx("btn btn-xs m-0.5 btn-primary", {
                "btn-outline": python == props.python,
              })}
            >
              {python}
            </button>
          </a>
        ))}
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {labels.os.map((os) => (
          <a key={os} href={buildUrl(null, null, os, null)} rel="nofollow">
            <button
              className={clsx("btn btn-xs m-0.5", {
                "btn-outline": os == props.os,
              })}
            >
              {os}
            </button>
          </a>
        ))}
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {labels.arch.map((arch) => (
          <a key={arch} href={buildUrl(null, null, null, arch)} rel="nofollow">
            <button
              className={clsx("btn btn-xs m-0.5 btn-warning", {
                "btn-outline": arch == props.arch,
              })}
            >
              {arch}
            </button>
          </a>
        ))}
      </div>
    </div>
  );
}
