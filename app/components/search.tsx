"use client";

import { MdOutlineSearch } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Record } from "@/app/utils/records";

const labels = {
  python: new Set<string>(),
  version: new Set<string>(),
  device: new Set<string>(),
  os: new Set<string>(),
  arch: new Set<string>(),
};

function search(strs: string[], term: string) {
  let lowerTerm = term.toLowerCase();
  return strs.filter((str) => str.toLowerCase().includes(lowerTerm));
}

export default function Search(props: { records: Record[] }) {
  useEffect(() => {
    props.records.forEach((record) => {
      labels.python.add(record.python);
      labels.version.add(record.version);
      labels.device.add(record.device);
      labels.os.add(record.os);
      labels.arch.add(record.arch);
    });
    console.log(labels);
  }, [props.records]);

  const searchParams = useSearchParams();
  const [candidates, setCandidates] = useState<string[]>([]);

  function handleSearch(term: string) {
    if (term === "") {
      setCandidates([]);
      return;
    }
    const tmp = [];
    tmp.push(...search(Array.from(labels.version), term));
    tmp.push(...search(Array.from(labels.device), term));
    tmp.push(...search(Array.from(labels.python), term));
    tmp.push(...search(Array.from(labels.os), term));
    tmp.push(...search(Array.from(labels.arch), term));
    setCandidates(tmp);
  }

  return (
    <div className="items-center w-6/12">
      <label className="input input-bordered flex items-center w-full">
        <MdOutlineSearch />
        <input
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          type="text"
          className="grow"
          placeholder="Search"
        />
      </label>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        {candidates.map((candidate, index) => {
          return (
            <li key={index}>
              <a onClick={() => {}}>{candidate}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
