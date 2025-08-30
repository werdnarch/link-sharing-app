"use client";
import React, { ReactNode, useState } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import DataProvider from "@/context/DataProvider";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <ThemeProvider attribute={"class"} defaultTheme="dark">
          {children}
        </ThemeProvider>
      </DataProvider>
    </QueryClientProvider>
  );
}
