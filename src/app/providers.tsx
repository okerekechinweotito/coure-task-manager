"use client";

import {
  Provider as ChakraProvider,
  JotaiProvider,
} from "@/shared/ui/theme/provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <ChakraProvider>{children}</ChakraProvider>;
    </JotaiProvider>
  );
}
