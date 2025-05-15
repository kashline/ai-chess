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
    <div
      style={{ display: "flex", position: "sticky", top: 0 }}
      className="bg-gradient-to-tr from-black via-gunmetal to-black z-10 h-[42px]"
    >
      <BurgerMenu />
      <div
        style={{
          display: "flex",
          width: "100%",
          border: "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href={"/"}>
          <p style={{ fontSize: "100%", color: "white" }}>AI Chess</p>
        </Link>
      </div>
      <div style={{ paddingLeft: "" }}>
        <ProfileButton />
      </div>
      
    </div>
  );
}
