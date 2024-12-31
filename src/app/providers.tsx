"use client";

import { Provider as ChakraProvider } from "@/shared/ui/theme/provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
