"use server";

import Link from "next/link";
import BurgerMenu from "@/app/ui/BurgerMenu";
import ProfileButton from "@/app/ui/ProfileButton";

/**
 * Default topbar that is present on all pages
 * @returns Promise<React.JSX.Element>
 */
export default async function DefaultTopbar() {
  return (
    <header className="w-full bg-black text-white shadow-md z-50 flex sticky top-0">
      <BurgerMenu />
      <div className="flex w-full border-none justify-center items-center">
        <Link href={"/"}>
          <p className="text-lg font-semibold tracking-tight text-lavendar-blush">
            AI Chess
          </p>
        </Link>
      </div>
      <div>
        <ProfileButton />
      </div>
    </header>
  );
}
