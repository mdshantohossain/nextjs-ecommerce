"use client";
import { store } from "@/features/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";

export default function ReduxWrapper({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      {children}
      </QueryClientProvider>
    </Provider>
  );
}
