"use client";
import { MdContentCopy } from "react-icons/md";

export default function Copy(props: { url: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText("pip install " + props.url)}
    >
      <MdContentCopy />
    </button>
  );
}
