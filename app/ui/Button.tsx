import React from "react";
import "./styles/Button.css";
import { twMerge } from "tailwind-merge";

/**
 * Standard button.  props are automatically applied to the button element
 * @param props
 * @returns React.JSX.Element
 */
export default function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  // Merge className prop (if any) with existing standard className
  const className = props.className
    ? twMerge(
        `text-lavendar-blush border-2 border-gray-500 w-fit px-5 rounded-md hover:border-non-photo-blue h-8`,
        props.className,
      )
    : `text-lavendar-blush border-2 border-gray-500 w-fit px-5 rounded-md hover:border-non-photo-blue h-8`;
  return (
    <button {...props} className={`${className}`}>
      {props.children}
    </button>
  );
}
