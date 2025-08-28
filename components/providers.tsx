"use client";
import React, { ReactNode, useState } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import DataProvider from "@/context/DataProvider";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <DataProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute={"class"} defaultTheme="dark">
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </DataProvider>
  );
}
