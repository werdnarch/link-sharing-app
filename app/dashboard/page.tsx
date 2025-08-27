"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Container from "@/components/Container";
import BlueButton from "@/components/BlueButton";
import { Plus } from "lucide-react";
import Wrapper from "@/components/ui/Wrapper";
import Profile from "@/components/Profile";
import { useQuery } from "@tanstack/react-query";
import { getProfileDetails } from "./actions";
import Loading from "@/components/Loading";

export default function page() {
  const [activeTab, setActiveTab] = useState<"Links" | "Profile">("Profile");

  const {
    data: user,
    error,
    isPending,
  } = useQuery({
    queryKey: ["get-profile-detail"],
    queryFn: getProfileDetails,
    staleTime: 5 * 60 * 1000,
  });

  if (error) return "Error has occured" + error;

  if (isPending) return <Loading />;

  return (
    <main className="w-full min-h-screen flex flex-col gap-4 p-4 md:p-8 max-w-7xl mx-auto ">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <section className="flex  gap-4 flex-1  mb-4 md:mb-8">
        <Container active={true} className="w-[40%] hidden lg:flex">
          <p></p>
        </Container>

        <Container active={activeTab === "Links"} className="flex-1">
          <div className="flex flex-col gap-2 md:gap-4">
            <h1 className="font-bold text-[1.3rem] md:text-3xl">
              Customise your links
            </h1>

            <p className="text-sm">
              Add/edit/remove links below and then share all your profiles with
              the world
            </p>
          </div>

          <BlueButton>
            <Plus className="size-4" />
            <p>Add new link</p>
          </BlueButton>
        </Container>
        <Profile active={activeTab === "Profile"} user={user} />
      </section>
    </main>
  );
}
