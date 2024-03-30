"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Continue() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function incLimit() {
    const params = new URLSearchParams(searchParams);
    const limit = Number(params.get("limit") || 100);
    params.set("limit", String(limit + 100));
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <button className="btn btn-circle m-5" onClick={incLimit}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v12M6 12h12"
          />
        </svg>
      </button>
    </div>
  );
}
