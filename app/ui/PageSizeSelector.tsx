"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

export default function PageSizeSelector() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const model = searchParams.get("model");
  const puzzle = searchParams.get("PuzzleId");
  const pageSize = searchParams.get("pageSize");
  const whereClause = {};
  if (model) {
    Object.assign(whereClause, { model: model });
  }
  if (puzzle) {
    Object.assign(whereClause, { PuzzleId: puzzle });
  }
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="">
      <label className="pr-2">Results per page</label>
      <select
        className="border-1 rounded-md border-lavendar-blush w-14"
        value={pageSize || "20"}
        onChange={(e) => {
          router.push(
            pathname + "?" + createQueryString(`pageSize`, `${e.target.value}`)
          );
        }}
      >
        <option>20</option>
        <option>50</option>
        <option>100</option>
      </select>
    </div>
  );
}
