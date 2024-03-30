"use client";

import { Label } from "@/app/utils/data";
import { clsx } from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search(props: { label: Label }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function addFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    replace(`${pathname}?${params.toString()}`);
  }

  function removeFilter(key: string) {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col w-9/12 max-w-5xl space-y-1.5">
      <div className="flex flex-wrap justify-center items-center">
        {props.label.device.map((device) => (
          <button
            key={device}
            className={clsx(
              "btn btn-xs m-0.5",
              {
                "btn-info": device.startsWith("CPU"),
                "btn-success": device.startsWith("CUDA"),
                "btn-error": device.startsWith("ROCm"),
              },
              { "btn-outline": device == searchParams.get("device") },
            )}
            onClick={() => {
              if (device == searchParams.get("device")) {
                removeFilter("device");
              } else {
                addFilter("device", device);
              }
            }}
          >
            {device}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {props.label.python.map((python) => (
          <button
            key={python}
            className={clsx("btn btn-xs m-0.5 btn-primary", {
              "btn-outline": python == searchParams.get("python"),
            })}
            onClick={() => {
              if (python == searchParams.get("python")) {
                removeFilter("python");
              } else {
                addFilter("python", python);
              }
            }}
          >
            {python}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {props.label.os.map((os) => (
          <button
            key={os}
            className={clsx("btn btn-xs m-0.5", {
              "btn-outline": os == searchParams.get("os"),
            })}
            onClick={() => {
              if (os == searchParams.get("os")) {
                removeFilter("os");
              } else {
                addFilter("os", os);
              }
            }}
          >
            {os}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center items-center">
        {props.label.arch.map((arch) => (
          <button
            key={arch}
            className={clsx("btn btn-xs m-0.5 btn-warning", {
              "btn-outline": arch == searchParams.get("arch"),
            })}
            onClick={() => {
              if (arch == searchParams.get("arch")) {
                removeFilter("arch");
              } else {
                addFilter("arch", arch);
              }
            }}
          >
            {arch}
          </button>
        ))}
      </div>
    </div>
  );
}
