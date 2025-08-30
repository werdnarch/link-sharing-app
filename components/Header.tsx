import React from "react";
import Logo from "./Logo";
import { Eye, Link2Icon, UserCircle } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  activeTab: "Links" | "Profile";
  setActiveTab: (tab: "Links" | "Profile") => void;
  id: string;
}

export default function Header({ activeTab, setActiveTab, id }: HeaderProps) {
  return (
    <header className="w-full p-4 flex items-center justify-between containers rounded-lg">
      <Logo />

      <nav>
        <ul className="flex items-center justify-center">
          <li>
            <button
              onClick={() => setActiveTab("Links")}
              className={`${
                activeTab === "Links"
                  ? "bg-[#928f9c] text-[#633cff]"
                  : "hover:text-[#633cff]"
              } p-3 px-4 rounded-lg md:p-4 md:px-6 transition-all duration-200 ease-in-out flex items-center gap-2 cursor-pointer text-sm`}
            >
              <Link2Icon className="size-4" />
              <p className="hidden md:block">Links</p>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("Profile")}
              className={`${
                activeTab === "Profile"
                  ? "bg-[#928f9c] text-[#633cff]"
                  : "hover:text-[#633cff]"
              } p-3 px-4 rounded-lg md:p-4 md:px-6 transition-all duration-200 ease-in-out flex items-center gap-2 cursor-pointer text-sm`}
            >
              <UserCircle className="size-4" />
              <p className="hidden md:block">Profile Details</p>
            </button>
          </li>
        </ul>
      </nav>

      <Link href={`/${id}`}>
        <button className="flex items-center justify-center p-3 text-[#633cff] border border-[#633cff] rounded-sm md:hover:bg-[#928f9c] cursor-pointer transition-all duration-150 font-bold md:px-6 ease-in-out text-sm">
          <Eye className="size-4 md:hidden" />
          <p className="hidden md:block">Preview</p>
        </button>
      </Link>
    </header>
  );
}
