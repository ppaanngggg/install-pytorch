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
  process.cwd() + "/public/static/records.json",
  "utf-8",
);
export const records: Record[] = JSON.parse(recordsStr);

export const pageSize: number = 20;

export function filterRecords(
  device: string | undefined,
  python: string | undefined,
  os: string | undefined,
  arch: string | undefined,
  page: number,
): Record[] {
  const ret: Record[] = [];
  // iter and filter records to ret, early stop at limit
  for (let record of records) {
    if (
      (device === undefined || record.device === device) &&
      (python === undefined || record.python === python) &&
      (os === undefined || record.os === os) &&
      (arch === undefined || record.arch === arch)
    ) {
      ret.push(record);
      if (ret.length >= page * pageSize) {
        break;
      }
    }
  }
  // return the slice from pageSize * (page - 1) to pageSize * page
  return ret.slice(pageSize * (page - 1), pageSize * page);
}

export type Label = {
  device: string[];
  python: string[];
  os: string[];
  arch: string[];
};

const labelsStr: string = readFileSync(
  process.cwd() + "/public/static/labels.json",
  "utf-8",
);

export const labels: Label = JSON.parse(labelsStr);
