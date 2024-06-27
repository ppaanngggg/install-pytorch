import { MdDownload } from "react-icons/md";
import { filterRecords, pageSize, Record } from "@/app/utils/data";
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
          <Link href={record.url} rel="noopener ugc nofollow">
            <MdDownload />
          </Link>
          <Copy record={record} />
        </div>
      </td>
    </tr>
  );
}

// read the data from the file, return a list of record
export default async function Table(props: {
  device: string | undefined;
  python: string | undefined;
  os: string | undefined;
  arch: string | undefined;
  page: number;
}) {
  const records = filterRecords(
    props.device,
    props.python,
    props.os,
    props.arch,
    props.page,
  );
  // calculate the prev page and next page
  const params = new URLSearchParams();
  props.device && params.set("device", props.device);
  props.python && params.set("python", props.python);
  props.os && params.set("os", props.os);
  props.arch && params.set("arch", props.arch);
  const curPage = props.page;
  params.set("page", curPage.toString());
  if (curPage > 1) {
    params.set("page", (curPage - 1).toString());
  }
  const prevPage = "?" + params.toString();
  params.set("page", curPage.toString());
  if (records.length >= pageSize) {
    params.set("page", (curPage + 1).toString());
  }
  const nextPage = "?" + params.toString();

  return (
    <div className="w-full flex flex-col items-center max-w-full bg-purple-50 py-8">
      <table className="table w-[48rem] max-w-full">
        <thead>
          <tr>
            <th>PyTorch Version</th>
            <th>Compute Device</th>
            <th>Python</th>
            <th>OS</th>
            <th>Arch</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{records.map((record) => Row(record))}</tbody>
      </table>
      <div className="join mt-4">
        <Link href={prevPage} rel="nofollow">
          <button className="join-item btn">«</button>
        </Link>
        <button className="join-item btn">Page {curPage}</button>
        <Link href={nextPage} rel="nofollow">
          <button className="join-item btn">»</button>
        </Link>
      </div>
    </div>
  );
}
