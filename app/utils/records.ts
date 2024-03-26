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

const data: string = readFileSync(
  process.cwd() + "/public/records.json",
  "utf-8",
);
export const records: Record[] = JSON.parse(data);
