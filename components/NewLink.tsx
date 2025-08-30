import React, { useState, useEffect } from "react";
import Wrapper from "./ui/Wrapper";
import { Equal, ChevronDown, Link2Icon } from "lucide-react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { LinkFormType } from "./LinksTab";
import { useData } from "@/context/DataContext";
import SelectIcon from "./SelectIcon";

interface NewLinkProps {
  id: string;
  index: number;
  platform: string;
  link: string;
  register: UseFormRegister<LinkFormType>;
  error?: FieldError;
}

const platformRegexMap = {
  Github: /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+$/,
  Youtube: /^(https?:\/\/)?(www\.)?youtube\.com\/.+$/,
};

export default function NewLink({
  id,
  index,
  platform,
  link,
  register,
  error,
}: NewLinkProps) {
  const { removeLink, editLink } = useData();
  const [input, setInput] = useState<string>("");

  const platforms = Object.keys(
    platformRegexMap
  ) as (keyof typeof platformRegexMap)[];
  const [selected, setSelected] = useState(
    platform as keyof typeof platformRegexMap
  );
  const [selectOpen, setSelectOpen] = useState(false);

  useEffect(() => {
    editLink(id, { platform: selected, link: input });
  }, [selected, input]);

  const validateLink = (value: string) =>
    platformRegexMap[selected].test(value) || `Invalid ${selected} link`;

  return (
    <Wrapper>
      <div className="w-full flex flex-col gap-4 p-2">
        <header className="flex items-center justify-between gap-2">
          <div className="flex items-center">
            <Equal className="size-4" />
            <p className="font-bold">Link #{index}</p>
          </div>

          <button
            type="button"
            onClick={() => removeLink(id)}
            className="text-sm hover:underline hover:text-red-500 transition-all duration-200 cursor-pointer ease-in-out"
          >
            Remove
          </button>
        </header>

        {/* Platform select */}
        <div className="flex flex-col gap-2">
          <label>
            <p className="text-sm">Platform</p>
          </label>
          <div
            onClick={() => setSelectOpen((prev) => !prev)}
            className="border p-4 containers pl-12 w-full text-sm rounded-lg cursor-pointer relative flex items-center justify-between"
          >
            <SelectIcon selected={selected} />
            <p>{selected}</p>
            <ChevronDown
              className={`size-5 ${
                selectOpen ? "" : "rotate-180"
              } transition-all`}
            />
            <div
              className={`absolute left-0 w-full top-full mt-2 border containers rounded-lg shadow-lg ${
                selectOpen
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none scale-95"
              } transition-all z-100`}
            >
              {platforms.map((plat, idx) => (
                <div
                  key={idx}
                  className="p-3 flex items-center gap-2 border-b last:border-b-0 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(plat);
                    setSelectOpen(false);
                  }}
                >
                  <SelectIcon option={plat} />
                  <p>{plat}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Link input */}
        <div className="flex flex-col gap-2">
          <label>
            <p className="text-sm">Link</p>
          </label>
          <div className="relative">
            <input
              {...register(id, { validate: validateLink })}
              onChange={(e) => setInput(e.target.value)}
              defaultValue={link}
              type="text"
              autoComplete="off"
              className="border containers p-4 px-12 w-full text-sm rounded-lg outline-0"
            />
            <Link2Icon className="size-4 absolute top-1/2 -translate-y-1/2 left-4" />
            {error ? (
              <p className="text-red-500 absolute top-1/2 -translate-y-1/2 right-4 text-sm">
                {error.message}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
