"use client";

import React from "react";
import Container from "./Container";
import Image from "next/image";
import { useTheme } from "next-themes";
import NoLinks from "./NoLinks";

interface PhoneProps {
  name: string;
  email: string;
}

export default function Phone({ email, name }: PhoneProps) {
  const { theme } = useTheme();

  const image =
    theme === "light"
      ? "/illustration-phone-mockup.svg"
      : "/illustration-phone-mockup-dark.svg";

  return (
    <Container
      active={true}
      className="w-[40%] h-full hidden lg:flex items-center justify-center relative"
    >
      <Image
        src={image}
        alt="phone-mockup"
        width={0}
        height={0}
        className="w-full max-w-[310px]"
      ></Image>
      <div className="h-fit w-[90%] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 max-w-[310px] p-4 flex flex-col items-center gap-6 md:gap-8">
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-base md:text-lg  font-bold">{name}</h1>
          <p className="text-sm">{email}</p>
        </div>

        <NoLinks />
      </div>
    </Container>
  );
}
