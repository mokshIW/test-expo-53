// app/_layout.tsx
import { setupRetryInterceptor } from "@/lib/retry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import React from "react";
import "../global.css";

// Initialize retry interceptor for API requests
setupRetryInterceptor();

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
    </QueryClientProvider>
  );
}
