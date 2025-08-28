import React from "react";
import { SiGithub, SiYoutube } from "react-icons/si";

interface IconProps {
  selected?: string;
  option?: string;
}
export default function SelectIcon({ selected, option }: IconProps) {
  return (
    <div
      className={`${selected && "absolute top-1/2 -translate-y-1/2 left-4"}`}
    >
      {(selected === "Github" || option === "Github") && <SiGithub />}
      {(selected === "Youtube" || option === "Youtube") && <SiYoutube />}
    </div>
  );
}
