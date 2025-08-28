import { ChevronDown, Link2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import SelectIcon from "./SelectIcon";
import { useData } from "@/context/DataContext";

interface LinkInputProps {
  id: string;
  link: string;
  platform: string;
}

export default function LinkInputs({ id, link, platform }: LinkInputProps) {
  const platforms: string[] = ["Github", "Youtube"];
  const { editLink } = useData();
  const [selected, setSelected] = useState<string>(platform);
  const [selectOpen, setSelectOpen] = useState(false);

  useEffect(() => {
    if (!selected) return;
    editLink(id, { platform: selected });
  }, [selected]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2 ">
        <label htmlFor="select">
          <p className="text-sm">Platform</p>
        </label>

        <div
          onClick={() => setSelectOpen((prev) => !prev)}
          className={`border p-4 pl-12 w-full text-sm rounded-lg cursor-pointer focus:outline-1 focus:outline-blue-400 containers transition-all duration-150 ease-in-out relative flex items-center justify-between`}
        >
          <SelectIcon selected={selected} />
          <p>{selected}</p>
          <ChevronDown
            className={` size-5 ${
              selectOpen ? "" : "rotate-180"
            } transition-all duration-200 ease-in-out`}
          />
          <div
            className={`absolute cursor-pointer  left-0 w-full top-full containers mt-2 z-100 border rounded-lg shadow-blue-500/20 shadow-lg ${
              selectOpen
                ? "opacity-100"
                : "opacity-0 pointer-events-none scale-95 "
            } transition-all duration-300 ease-in-out`}
          >
            {platforms.map((platform: string, index: number) => (
              <div
                onClick={() => {
                  setSelected(platform);
                  setSelectOpen(false);
                }}
                key={`platform-${index}`}
                className={`p-3 md:p-4 flex text-sm items-center gap-2 ${
                  index !== platforms.length ? "border-b-1" : ""
                }`}
              >
                <SelectIcon option={platform} />
                <p>{platform}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <label>
          <p className="text-sm">Links</p>
        </label>

        <div className="relative">
          <input
            type="text"
            autoComplete="off"
            className={`border p-4 px-12 w-full text-sm rounded-lg  outline-0 containers transition-all duration-150 ease-in-out`}
          ></input>
          <Link2Icon className="size-4 absolute top-1/2 -translate-y-1/2 left-4" />
        </div>
      </div>
    </div>
  );
}
