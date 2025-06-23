"use server";

import Bot from "@/app/data/models/Bot";
import { BotZodel } from "@/app/data/zodels/BotZodel";
import BotEditFormClientWrapper from "@/app/ui/BotEditFormClientWrapper";
import Button from "@/app/ui/Button";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = (await cookies()).get("userId")?.value;
  const session = await auth();
  const bot = BotZodel.parse(
    (await Bot.findOne({ where: { UserID: userId, id: id } }))?.dataValues
  );
  if (bot === null) {
    return <div>This ain&apos;t your bot</div>;
  }
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
  return (
    <div>
      <div className="flex">
        <h1 className="mx-auto py-4 text-4xl text-lavendar-blush">Edit Bot</h1>
      </div>

      <BotEditFormClientWrapper bot={bot} edit={true} />
    </div>
  );
}
