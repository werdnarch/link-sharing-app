"use client";
import { ReactNode, useEffect, useState } from "react";
import { DataContext, LinkType } from "@/context/DataContext";
import { useQuery } from "@tanstack/react-query";
import { getLinks } from "./action";

type Props = {
  children: ReactNode;
};

export default function DataProvider({ children }: Props) {
  const { data, isPending, error } = useQuery({
    queryKey: ["get-link-context"],
    queryFn: getLinks,
  });

  const [links, setLinks] = useState<LinkType[]>(data ?? []);

  useEffect(() => {
    if (!data) return;
    setLinks(data);
  }, [data]);

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
