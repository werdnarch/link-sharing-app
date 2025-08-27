import React, { ReactNode } from "react";

interface BlueButton {
  children: ReactNode;
  onClick?: () => void;
}

export default function BlueButton({ children, onClick }: BlueButton) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center p-3 text-[#633cff] border border-[#633cff] rounded-sm md:hover:bg-[#928f9c] cursor-pointer transition-all duration-150 font-bold md:px-6 ease-in-out text-sm"
    >
      {children}
    </button>
  );
}
