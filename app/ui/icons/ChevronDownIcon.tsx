import ChevronLeftIcon from "@/app/ui/icons/ChevronLeftIcon";
import { twMerge } from "tailwind-merge";

export default function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
    const className = props.className
    ? twMerge(
        `rotate-270`,
        props.className,
      )
    : `rotate-270`;
  return <ChevronLeftIcon className={`${className}`} />;
}
