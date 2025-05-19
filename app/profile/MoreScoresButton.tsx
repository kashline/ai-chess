"use client";

import { useRouter } from "next/navigation";

export default function MoreScoresButton() {
  const router = useRouter();
  return (
    <div className="flex">
      <button
        className="mx-auto text-non-photo-blue my-2 hover:text-blue-600"
        onClick={() => {
          router.push(`/profile/scores`);
        }}
      >
        More scores
      </button>
    </div>
  );
}
