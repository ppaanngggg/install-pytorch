"use client";
import { MdContentCopy } from "react-icons/md";

export default function Copy(props: { url: string }) {
  const cmd = "pip install " + props.url;
  return (
    <div className="tooltip tooltip-left" data-tip="Copy pip install">
      <button onClick={() => navigator.clipboard.writeText(cmd)}>
        <MdContentCopy />
      </button>
    </div>
  );
}
