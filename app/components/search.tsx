"use client";

import { useEffect, useState } from "react";
import { Record } from "@/app/utils/records";
import { clsx } from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Label = {
  device: string[];
  python: string[];
  os: string[];
  arch: string[];
};

export default function Search(props: { records: Record[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function addFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    replace(`${pathname}?${params.toString()}`);
  }

  function removeFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    replace(`${pathname}?${params.toString()}`);
  }

  const [labels, setLabels] = useState<Label>({
    device: [] as string[],
    python: [] as string[],
    os: [] as string[],
    arch: [] as string[],
  });

  useEffect(() => {
    let device: Set<string> = new Set();
    let python: Set<string> = new Set();
    let os: Set<string> = new Set();
    let arch: Set<string> = new Set();
    props.records.forEach((record) => {
      device.add(record.device);
      python.add(record.python);
      os.add(record.os);
      arch.add(record.arch);
    });
    // turn to array and sort
    let newLabels: Label = { device: [], python: [], os: [], arch: [] };
    newLabels.device = Array.from(device).sort();
    newLabels.python = Array.from(python).sort();
    newLabels.os = Array.from(os).sort();
    newLabels.arch = Array.from(arch).sort();
    setLabels(newLabels);
  }, [props.records]);

  return (
    <div className="flex flex-col w-9/12 max-w-5xl space-y-1.5">
      <div className="flex flex-wrap justify-center items-center">
        {labels.device.map((device) => (
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
                removeFilter("device", device);
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
        {labels.python.map((python) => (
          <button
            key={python}
            className={clsx("btn btn-xs m-0.5 btn-primary", {
              "btn-outline": python == searchParams.get("python"),
            })}
            onClick={() => {
              if (python == searchParams.get("python")) {
                removeFilter("python", python);
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
        {labels.os.map((os) => (
          <button
            key={os}
            className={clsx("btn btn-xs m-0.5", {
              "btn-outline": os == searchParams.get("os"),
            })}
            onClick={() => {
              if (os == searchParams.get("os")) {
                removeFilter("os", os);
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
        {labels.arch.map((arch) => (
          <button
            key={arch}
            className={clsx("btn btn-xs m-0.5 btn-warning", {
              "btn-outline": arch == searchParams.get("arch"),
            })}
            onClick={() => {
              if (arch == searchParams.get("arch")) {
                removeFilter("arch", arch);
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
