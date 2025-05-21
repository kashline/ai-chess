"use server";

import User from "@/app/data/models/User";
import UserScore from "@/app/data/models/UserScore";
import MoreScoresButton from "@/app/profile/MoreScoresButton";
import ProfileInfo from "@/app/profile/ProfileInfo";
import UserScoreHistory from "@/app/profile/UserScoreHistory";
import Button from "@/app/ui/Button";
import { auth } from "@/auth";
import Link from "next/link";
import * as React from "react";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) {
    return (
      <div className="flex pt-10">
        <div className="mx-auto my-auto">
          <p className="text-lavendar-blush">
            You must be logged in to view this page.
          </p>
          <div className="">
            <Button className="">
              <Link href={`/`}>Go home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  const { id } = (
    await User.findOne({ where: { email: session?.user?.email }, limit: 10 })
  )?.dataValues;
  const userScores = (await UserScore.findAll({ where: { UserId: id } })).map(
    (score) => score.dataValues
  );
  return (
    <div>
      <ProfileInfo />
      <div className="flex">
        <h1 className="mx-auto text-4xl my-2 text-lavendar-blush">
          Recent scores
        </h1>
      </div>
      <div className="w-[80%] mx-auto">
        <UserScoreHistory userScores={userScores} />
        <MoreScoresButton />
      </div>
    </div>
  );
}
