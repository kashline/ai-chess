"use client";

import { useAppSelector } from "@/app/store/hooks";
import Button from "@/app/ui/Button";
import { useRouter } from "next/navigation";

export default function CreateUsernameBanner() {
  const reduxUser = useAppSelector((state) => state.user);
  const router = useRouter();
  if (reduxUser.user?.username === null) {
    return (
      <div className="w-full h-fit text-lavendar-blush bg-chili-red">
        <div className="flex">
          <div className="mx-auto">
            You haven&apos;t set a username. Set one to post your scores to the leaderboard!
          </div>
        </div>
        <div className="flex">
          <Button
            className={`mx-auto`}
            onClick={() => {
              router.push(`/create-username`);
            }}
          >
            Create username
          </Button>
        </div>
      </div>
    );
  }
  return <div></div>;
}
