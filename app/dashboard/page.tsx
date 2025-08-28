"use client";

import React, { useState } from "react";
import Phone from "@/components/Phone";
import Header from "@/components/Header";
import LinksTab from "@/components/LinksTab";
import Profile from "@/components/Profile";
import { useQuery } from "@tanstack/react-query";
import { getProfileDetails } from "./actions";
import Loading from "@/components/Loading";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"Links" | "Profile">("Links");

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
        <Phone name={user.firstName + " " + user.lastName} email={user.email} />

        <LinksTab active={activeTab === "Links"} />

        <Profile active={activeTab === "Profile"} user={user} />
      </section>
    </main>
  );
}
