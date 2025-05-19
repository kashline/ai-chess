"use server";

import { UserScoreZype } from "@/app/data/zodels/UserScoreZodel";

export default async function UserScoreHistory({
  userScores,
}: {
  userScores: UserScoreZype[];
}) {
  if (userScores.length === 0) {
    return (
      <div className="flex">
        <p className="mx-auto">No scores available.</p>
      </div>
    );
  }
  const columns: (keyof Pick<
    UserScoreZype,
    "score" | "prompt" | "createdAt"
  >)[] = ["score", "prompt", "createdAt"];

  const formatDateTime = (date: Date) => {
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
      <div className="flex w-full">
        <table className="border-collapse w-[60%] mx-auto">
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
                    {key === "createdAt" && score[key]
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
