"use client";

import {
  BotZype,
  CreateBotZodel,
  CreateBotZype,
} from "@/app/data/zodels/BotZodel";
import BotEditForm from "@/app/ui/BotEditForm";
import { useState } from "react";
// import { Dispatch, SetStateAction } from "react";

type BotEditFormProps = {
  bot: BotZype | CreateBotZype;
  edit: boolean;
  //   setStatus: Dispatch<SetStateAction<"error" | "idle" | "submitting" | "success">>
};

export default function BotEditFormClientWrapper({
  bot,
  edit,
}: BotEditFormProps) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  return (
    <BotEditForm
      bot={bot}
      status={status}
      setStatus={setStatus}
      onSubmit={async (data) => {
        const parsed = CreateBotZodel.parse(data);
        const res = await fetch(`/api/bots/${edit ? "edit" : "create"}`, {
          method: "POST",
          body: JSON.stringify(parsed),
          headers: { "Content-Type": "application/json" },
        });
        if (res.status === 200) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      }}
    />
  );
}
