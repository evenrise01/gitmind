import "@/styles/globals.css";

import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";

// Define metadata
export const metadata: Metadata = {
  title: "GitMind",
  description: "Understand your GitHub codebase",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Import Satoshi font from Fontshare CDN */}
          <link
            href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="font-satoshi">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>{children}</TRPCReactProvider>
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}