"use client";

import React from "react";
import HomeIcon from "@/app/ui/icons/HomeIcon";
import BurgerMenuButton from "@/app/ui/BurgerMenuButton";
import ProfileIcon from "@/app/ui/icons/ProfileIcon";
import { useAppSelector } from "@/app/store/hooks";
import BurgerMenuSignout from "@/app/ui/BurgerMenuSignout";
import BurgerMenuSignin from "@/app/ui/BurgerMenuSignin";
import LeaderboardIcon from "@/app/ui/icons/LeaderboardIcon";
import QueenIcon from "@/app/ui/icons/QueenIcon";

/**
 * Burger menu for navigating the site.  Provides links dependent on session validation
 * @param param0
 * @returns React.JSX.Element
 */
export default function BurgerMenu() {
  const [menuToggle, setMenuToggle] = React.useState(false);
  const handleClick = () => {
    setMenuToggle(!menuToggle);
  };
  const user = useAppSelector((state) => state.user);
  const wrapperRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setMenuToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  });
  return (
    <div className={`float-left`}>
      <button
        onClick={handleClick}
        className={`px-0 hover:shadow-none py-0 max-h-[42] ${
          !menuToggle ? "visible" : "invisible"
        }`}
        data-cy="menuburgerbutton"
      >
        <QueenIcon className="stroke-lavendar-blush w-[42] max-h-[42] " />
      </button>
      <div
        className={`text-lavendar-blush gap-10 absolute z-50 bg-gunmetal w-64 h-dvh transition-all ease-in duration-200 border-solid top-0 border-gray-500 border-2 rounded-lg ${
          !menuToggle ? "-left-64" : "left-0"
        }`}
        ref={wrapperRef}
      >
        <nav className="">
          <ul className="">
            <button
              onClick={() => {
                setMenuToggle(false);
              }}
              className="w-full"
            >
              <BurgerMenuButton
                title="Home"
                href="/"
                Icon={HomeIcon({ fill: "#eee5e9", width: 25, height: 25 })}
              />
            </button>
            <button
              onClick={() => {
                setMenuToggle(false);
              }}
              className="w-full"
            >
              <BurgerMenuButton
                title="Play"
                href="/play/"
                Icon={QueenIcon({
                  fill: "#eee5e9",
                  width: 25,
                  height: 25,
                  stroke: `white`,
                })}
              />
            </button>
            <button
              onClick={() => {
                setMenuToggle(false);
              }}
              className="w-full"
            >
              <BurgerMenuButton
                title="Leaderboard"
                href="/leaderboard/"
                Icon={LeaderboardIcon({
                  fill: "#eee5e9",
                  width: 25,
                  height: 25,
                })}
              />
            </button>
          </ul>
          {user.user && (
            <div>
              <hr className="h-0.5 border-b-lavendar-blush" />
              <ul>
                <button
                  onClick={() => {
                    setMenuToggle(false);
                  }}
                  className="w-full"
                >
                  <BurgerMenuButton
                    title="Profile"
                    href="/profile/"
                    Icon={ProfileIcon({
                      fill: "#eee5e9",
                      width: 25,
                      height: 25,
                    })}
                  />
                </button>
              </ul>
              <BurgerMenuSignout />
            </div>
          )}
          {!user.user && <BurgerMenuSignin />}
        </nav>
      </div>
    </div>
  );
}
