"use client";

import BlueButton from "@/components/BlueButton";
import Logo from "@/components/Logo";
import React, { use } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "./actions";
import Loading from "@/components/Loading";
import LinkCard from "@/components/LinkCard";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { data, isPending, error } = useQuery({
    queryKey: ["get-user", id],
    queryFn: () => getUser(id),
  });

  if (error) return "Error occured while fetching :" + error;

  if (isPending) return <Loading />;

  const user = data.user;

  return (
    <main className="h-full p-4 md:p-12 flex flex-col items-center gap-4 md:gap-8">
      <header className="containers p-4 w-full rounded-2xl max-w-[1200px] mx-auto flex items-center justify-between">
        <Logo />

        <BlueButton
          onClick={() => {
            router.push("/");
          }}
        >
          <p>Create Your Own</p>
        </BlueButton>
      </header>

      <section className="flex-1 w-full max-w-[1200px] flex flex-col items-center">
        <div className="h-fit min-h-[600px] w-full max-w-[450px] containers rounded-[2rem] p-4 md:p-8 flex flex-col items-center gap-6">
          <div className="w-[40%] aspect-square rounded-full border-1 border-blue-500"></div>

          <div className="w-full flex flex-col items-center gap-4 text-center">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p>{user.email}</p>
          </div>

          <div className="w-full flex flex-col gap-2 max-w-[280px]">
            <LinkCard link="/" platform="Github" />
          </div>
        </div>
      </section>
    </main>
  );
}
