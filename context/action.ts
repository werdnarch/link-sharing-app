import { LinkType } from "@/types";
import { notFound } from "next/navigation";

export const getLinks = async () => {
  try {
    const res = await fetch("/api/user/links");

    if (!res.ok) {
      console.log("Hit");
      return notFound();
    }

    const data: LinkType[] = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching links:", error);
  }
};
