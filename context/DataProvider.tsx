"use client";
import { ReactNode, useState } from "react";
import { DataContext, LinkType } from "@/context/DataContext";

type Props = {
  children: ReactNode;
};

export default function DataProvider({ children }: Props) {
  const [links, setLinks] = useState<LinkType[]>([]);

  const addLink = (link: LinkType) => {
    setLinks((prev) => [...prev, link]);
  };

  const removeLink = (id: string) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const editLink = (id: string, properties: Partial<LinkType>) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, ...properties } : link))
    );
  };

  return (
    <DataContext.Provider
      value={{ links, setLinks, removeLink, addLink, editLink }}
    >
      {children}
    </DataContext.Provider>
  );
}
