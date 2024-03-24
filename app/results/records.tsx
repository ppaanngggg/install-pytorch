import { promises as fs } from "fs";

type Record = {
  filename: string;
  version: string;
  device: string;
};

// read the data from the file, return a list of record
export default async function Records() {
  const data = await fs.readFile(
    process.cwd() + "/public/records.json",
    "utf-8",
  );
  const records = JSON.parse(data);
  return (
    <div>
      {records.map((record: Record) => (
        <div key={record.filename}>
          <div>{record.version}</div>
          <div>{record.device}</div>
        </div>
      ))}
    </div>
  );
}
