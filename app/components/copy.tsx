"use client";
import { MdContentCopy } from "react-icons/md";
import { Record } from "@/app/utils/data";

export default function Copy(props: { record: Record }) {
  let repo = props.record.url.split("/torch-")[0];
  if (repo.endsWith("whl")) {
    repo += "/cpu";
  }
  const cmd = "pip install torch==" + props.record.version + " -i " + repo;
  return (
    <div className="tooltip tooltip-left" data-tip={cmd}>
      <button onClick={() => navigator.clipboard.writeText(cmd)}>
        <MdContentCopy />
      </button>
    </div>
  );
}
