import { readFileSync } from "fs";

export type Record = {
  id: string;
  url: string;
  python: string;
  version: string;
  device: string;
  os: string;
  arch: string;
};

const recordsStr: string = readFileSync(
  process.cwd() + "/public/records.json",
  "utf-8",
);
export const records: Record[] = JSON.parse(recordsStr);

export type Label = {
  device: string[];
  python: string[];
  os: string[];
  arch: string[];
};

const labelsStr: string = readFileSync(
  process.cwd() + "/public/labels.json",
  "utf-8",
);

export const labels: Label = JSON.parse(labelsStr);
