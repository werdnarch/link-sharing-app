import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  active: boolean;
  className?: string;
}

export default function Container({
  children,
  active,
  className = "w-full",
}: ContainerProps) {
  return (
    <div
      className={` h-full p-4 md:p-6 lg:p-8 rounded-lg containers ${
        !active ? "hidden" : "flex"
      } ${className} flex-col gap-3`}
    >
      {children}
    </div>
  );
}
