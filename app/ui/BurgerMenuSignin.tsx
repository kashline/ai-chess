import LoginIcon from "@/app/ui/icons/LoginIcon";
import { signIn } from "next-auth/react";

export default function BurgerMenuSignin() {
  return (
    <div
      className="w-full h-10 bottom-0 absolute border-solid border-green-400 border-2 hover:border-green-600"
      data-cy="burgermenulogin"
    >
      <button
        className="flex text-lavendar-blush w-full"
        onClick={() => {
          signIn();
        }}
      >
        <p className="ml-3 my-auto">Login</p>
        <div className="pt-1 ml-auto pr-2 my-auto">
          <LoginIcon />
        </div>
      </button>
    </div>
  );
}
