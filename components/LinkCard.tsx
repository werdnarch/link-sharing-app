import React from "react";
import SelectIcon from "./SelectIcon";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface LinkCardProps {
  platform: string;
  link?: string;
}

export default function LinkCard({ link, platform }: LinkCardProps) {
  return link ? (
    <Link
      href={link}
      className="border rounded-lg text-[0.8rem] p-3 text-white border-white/70 px-4 flex items-center gap-2 hover:scale-97 transition-all duration-200 ease-in-out "
    >
      <SelectIcon option={platform} />
      {platform}

      <ArrowRight className="size-4 ml-auto" />
    </Link>
  ) : (
    <div className="border rounded-lg text-[0.8rem] p-3 text-white border-white/70 px-4 flex items-center gap-2 hover:scale-97 transition-all duration-200 ease-in-out ">
      <SelectIcon option={platform} />
      {platform}

      <ArrowRight className="size-4 ml-auto" />
    </div>
  );
}
