import LogoutIcon from "@/app/ui/icons/LogoutIcon";
import { signOut } from "next-auth/react";

export default function BurgerMenuSignout(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="w-full h-10 bottom-0 absolute border-solid border-chili-red hover:border-red-800 border"
      {...props}
    >
      <button
        className="flex text-lavendar-blush w-full"
        onClick={() => signOut()}
      >
        <p className="ml-3 my-auto">Logout</p>
        <div className="pt-1 ml-auto pr-2 my-auto">
          <LogoutIcon />
        </div>
      </button>
    </div>
  );
}
