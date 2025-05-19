import { twMerge } from "tailwind-merge";

export default function ProfileLoadingSkeleton(
  props?: React.HTMLAttributes<HTMLDivElement>
) {
  const classBase = `animate-pulse bg-gunmetal rounded w-full h-6 mx-auto`;
  const className = props!.className
    ? twMerge(classBase, props!.className)
    : classBase;
  return (
    <div className="flex">
      <div {...props} className={className}>
        <div></div>
      </div>
    </div>
  );
}
