import React, { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}
export default function Wrapper({ children }: WrapperProps) {
  return (
    <div className="w-full h-full p-4 rounded-md semi-containers flex flex-col gap-3">
      {children}
    </div>
  );
}
