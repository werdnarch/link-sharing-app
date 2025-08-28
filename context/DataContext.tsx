"use client";
import { createContext, useContext } from "react";

export type LinkType = {
  id: string;
  platform: string;
  link: string;
};

type DataContextType = {
  links: LinkType[];
  setLinks: React.Dispatch<React.SetStateAction<LinkType[]>>;
  addLink: (link: LinkType) => void;
  removeLink: (id: string) => void;
  editLink: (id: string, properties: Partial<LinkType>) => void;
};

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
