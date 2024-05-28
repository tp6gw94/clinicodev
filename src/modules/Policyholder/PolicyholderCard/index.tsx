import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import type { FC } from "react";

import { Policyholder } from "#/types/Policyholder";

export interface PolicyholderCardProps
  extends Pick<Policyholder, "code" | "name"> {
  className?: string;
  root?: boolean;
  introducerIsRoot?: boolean;
}

const PolicyholderCard: FC<PolicyholderCardProps> = (props) => {
  return (
    <div
      className={clsx(
        "border p-2 list-none w-32 h-20 text-nowrap",
        {
          "bg-gray-300": !props.introducerIsRoot && !props.root,
          "bg-green-300": props.introducerIsRoot,
          "bg-yellow-300": props.root,
        },
        props.className,
      )}
    >
      <Link className="underline" href="/" search={{ code: props.code }}>
        {props.code}
      </Link>
      <div>{props.name}</div>
    </div>
  );
};

export default PolicyholderCard;
