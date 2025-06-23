"use client";

import {
  BotZype,
  CreateBotZodel,
  CreateBotZype,
} from "@/app/data/zodels/BotZodel";
import BotEditForm from "@/app/ui/BotEditForm";

type BotEditFormProps = {
  bot: BotZype | CreateBotZype;
  edit: boolean;
};

export default function BotEditFormClientWrapper({
  bot,
  edit,
}: BotEditFormProps) {
  return (
    <BotEditForm
      bot={bot}
      onSubmit={async (data) => {
        const parsed = CreateBotZodel.parse(data);
        await fetch(`/api/bots/${edit ? "edit" : "create"}`, {
          method: "POST",
          body: JSON.stringify(parsed),
          headers: { "Content-Type": "application/json" },
        });
      }}
    />
  );
}
