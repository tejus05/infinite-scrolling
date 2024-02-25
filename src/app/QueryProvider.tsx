"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";

const QueryProvider = ({children}:PropsWithChildren) => {

  const [client] = useState(()=>new QueryClient)

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryProvider