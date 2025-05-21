"use server";

import Link from "next/link";

export default async function Page() {
  return (
    <main className="is-preload ">
      <div
        className="h-svh "
        style={{
          background: `url(/chessboard-opaque.png)`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex justify-center my-auto mx-auto max-w-lvw relative z-10 bg-gradient-to-b from-gray-900 to-gunmetal shadow-inner border-t border-gunmetal">
          <h1
            style={{ textShadow: "4px 4px 8px #000000" }}
            className={`text-6xl text-lavendar-blush opacity-85 rounded-md`}
          >
            Welcome to AI Chess
          </h1>
        </div>
        <div className="w-full h-full flex justify-center ">
          <div className="border-4 bg-gunmetal px-2 py-2 rounded-md border-black my-auto">
            <h1 className="text-non-photo-blue text-8xl">
              <p className="mx-auto text-2xl">How smart is AI?</p>
            </h1>
            <div className="flex"></div>
            <div className="flex">
              <p className="mx-auto text-lavendar-blush">
                Test LLMs and your prompt against various chess problems. How
                can you modify the behavior to get a better score?
              </p>
            </div>
            <div className="flex">
              <Link
                href={`/play`}
                className="mx-auto text-non-photo-blue hover:text-blue-400"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
        <div className="flex h-full">
          <div className="w-full my-auto">
            <div className="flex">
              <p className="mx-auto text-2xl"></p>
            </div>
          </div>
        </div>
        <div className="flex"></div>
      </div>
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255)",
          maxWidth: "100vw",
        }}
        className="flex justify-center my-auto mx-auto max-w-lvw relative z-10 h-20 bg-gradient-to-b from-gray-900 to-gunmetal shadow-inner border-t border-gunmetal"
      >
        <p className="text-4xl text-lavendar-blush mx-auto my-auto justify-center">
          Reach the top of the leaderboard!
        </p>
      </div>
      <div
        className="h-svh"
        style={{
          background: `url(/leaderboard-opaque.png)`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="h-full">
          <div className="w-fit mx-auto bg-clip-content h-full flex">
            <div className="border-4 px-2 rounded-md border-black w-full bg-gunmetal my-auto">
              <h1 className="text-non-photo-blue text-4xl">Craft your bot</h1>
              <span className="text-lavendar-blush text-2xl">
                Choose an LLM define a prompt and go!
              </span>
              <h1 className="text-non-photo-blue text-4xl">
                Submit your score
              </h1>
              <span className="text-lavendar-blush text-2xl">
                Once your run finishes, submit your score! See how you compare!
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
