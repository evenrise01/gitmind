"use client";

import { Tabs } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TabsContent } from "@radix-ui/react-tabs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import React, { useState, useEffect } from "react";

type Props = {
  fileReferences: { fileName: string; sourceCode: string; summary: string }[];
  className?: string;
};

const CodeReferences = ({ fileReferences, className }: Props) => {
  const [tab, setTab] = React.useState(fileReferences[0]?.fileName);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  // Detect theme changes
  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    updateTheme(); // Initial check
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (fileReferences.length === 0) return null;

  return (
    <div className={cn("max-w-[70vw]", className)}>
      <Tabs value={tab} onValueChange={setTab}>
        <div className="flex gap-2 overflow-scroll rounded-md bg-muted p-2 dark:bg-muted-dark">
          {fileReferences.map((file) => (
            <button
              onClick={() => setTab(file.fileName)}
              key={file.fileName}
              className={cn(
                "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/80 dark:hover:bg-muted-dark/80",
                {
                  "bg-primary text-primary-foreground": tab === file.fileName,
                },
              )}
            >
              {file.fileName}
            </button>
          ))}
        </div>
        {fileReferences.map((file) => (
          <TabsContent
            key={file.fileName}
            value={file.fileName}
            className="max-h-[40vh] max-w-7xl overflow-scroll rounded-md mt-2"
          >
            <SyntaxHighlighter
              language="typescript"
              style={theme === "dark" ? dracula : oneLight}
              customStyle={{
                margin: 0,
                padding: "1rem",
                borderRadius: "0.5rem",
                background: "var(--background)",
                color: "var(--foreground)",
              }}
            >
              {file.sourceCode}
            </SyntaxHighlighter>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CodeReferences;