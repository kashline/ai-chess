import Link from "next/link";
import * as React from "react";

export default function BurgerMenuButton({
  Icon,
  href,
  title,
}: {
  Icon: React.JSX.Element;
  href: string;
  title: string;
}) {
  return (
    <Link href={href} className={`text-lavendar-blush hover:text-non-photo-blue`}>
      <li
        className={`flex gap-2 hover:border-solid hover:border-non-photo-blue hover:border-2 border-2 border-transparent rounded-lg w-full my-auto h-14`}
      >
        <div className="my-auto flex gap-4">
          {Icon}
          {title}
        </div>
      </li>
    </Link>
  );
}
