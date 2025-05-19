"use server";

import ProfileInfo from "@/app/profile/ProfileInfo";
import UserScoreHistory from "@/app/profile/UserScoreHistory";
import * as React from "react";

export default async function ProfilePage() {
  return (
    <div>
      <ProfileInfo />
      <UserScoreHistory />
    </div>
  );
}
