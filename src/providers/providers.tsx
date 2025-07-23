"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import AuthListener from "./AuthListener";

export default function Providers({ children }: { children: ReactNode }) {
  // Create a client per app instance
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthListener>  
        {children}
      </AuthListener>
    </QueryClientProvider>
  );
}
