import { MdDownload } from "react-icons/md";
import { Record } from "@/app/utils/data";
import Copy from "@/app/components/copy";
import Link from "next/link";

function Row(record: Record) {
  return (
    <tr key={record.id}>
      <td>{record.version}</td>
      <td>{record.device}</td>
      <td>{record.python}</td>
      <td>{record.os}</td>
      <td>{record.arch}</td>
      <td>
        <div className="flex flex-row items-center space-x-2">
          <Link href={record.url}>
            <MdDownload />
          </Link>
          <Copy record={record} />
        </div>
      </td>
    </tr>
  );
}

// read the data from the file, return a list of record
export default async function Table(props: { records: Record[] }) {
  return (
    <div className="overflow-auto w-8/12 max-w-4xl">
      <table className="table table-lg">
        <thead>
          <tr>
            <th>PyTorch Build</th>
            <th>Compute Platform</th>
            <th>Python Version</th>
            <th>Your OS</th>
            <th>Arch</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{props.records.map((record) => Row(record))}</tbody>
      </table>
    </div>
  );
}
