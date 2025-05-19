"use server";

import User from "@/app/data/models/User";
import UserScore from "@/app/data/models/UserScore";
import { UserScoreZype } from "@/app/data/zodels/UserScoreZodel";
import { auth } from "@/auth";

export default async function UserScoreHistory() {
  const session = await auth();
  const { id } = (
    await User.findOne({ where: { email: session?.user?.email } })
  )?.dataValues;
  const userScores = (await UserScore.findAll({ where: { UserId: id } })).map(
    (score) => score.dataValues
  );
  if (userScores.length === 0) {
    return <p>No scores available.</p>;
  }
  const columns: (keyof Pick<
    UserScoreZype,
    "score" | "model" | "prompt" | "createdAt"
  >)[] = ["score", "model", "prompt", "createdAt"];

  const formatDateTime = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="">
      <div className="flex">
        <h1 className="mx-auto text-4xl my-2 text-lavendar-blush">
          Score History
        </h1>
      </div>

      <div className="flex w-full">
        <table className="border-collapse w-[80%] mx-auto">
          <thead>
            <tr>
              {columns.map((key) => (
                <th
                  key={key}
                  className={`border border-gunmetal px-4 py-2 text-left font-medium ${
                    key === "createdAt" ? "text-right" : null
                  }`}
                >
                  {key === "createdAt" ? "created" : key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userScores.map((score, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((key) => (
                  <td
                    key={key}
                    className={`border border-gunmetal px-4 py-2 ${
                      key === "createdAt" ? "text-right" : null
                    }`}
                  >
                    {key === "createdAt"
                      ? formatDateTime(score[key])
                      : score[key]?.toString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
