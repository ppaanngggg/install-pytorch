import { MdDownload } from "react-icons/md";
import { Record, records } from "@/app/utils/records";

function Row(record: Record) {
  return (
    <tr key={record.id}>
      <td>{record.version}</td>
      <td>{record.device}</td>
      <td>{record.python}</td>
      <td>{record.os}</td>
      <td>{record.arch}</td>
      <td>
        <a href={record.url}>
          <MdDownload />
        </a>
      </td>
    </tr>
  );
}

// read the data from the file, return a list of record
export default async function Table() {
  return (
    <div className="overflow-x-auto">
      <table className="table">
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
        <tbody>{records.map((record: Record) => Row(record))}</tbody>
      </table>
    </div>
  );
}
