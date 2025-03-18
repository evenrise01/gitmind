"use client";
import Link from "next/link";
import { Logo } from "./logo";
import { Menu, Sun, Moon } from "lucide-react"; // Removed X since we'll use Sheet
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // Added ShadCN Sheet
import React from "react";
import { useScroll, motion } from "framer-motion"; // Updated import for Framer Motion
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Features", href: "#features" },
  { name: "Solution", href: "#solution" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "/about" },
];

// Animation variants for the mobile menu
const mobileMenuVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export const HeroHeader = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);
  const { scrollYProgress } = useScroll();

  // Detect initial theme and sync with state
  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  // Handle theme toggle
  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  // Scroll effect
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <header>
      <nav className="fixed z-50 w-full pt-2">
        <div
          className={cn(
            "mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12",
            scrolled && "bg-background/50 backdrop-blur-2xl"
          )}
        >
          <motion.div
            className={cn(
              "relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6",
              scrolled && "lg:py-4"
            )}
          >
            {/* Logo */}
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center space-x-2">
                <Logo />
              </Link>

              {/* Hamburger Menu for Mobile */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    aria-label="Open Menu"
                  >
                    <Menu className="size-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={mobileMenuVariants}
                    className="flex h-full flex-col justify-between py-6"
                  >
                    {/* Mobile Menu Items */}
                    <ul className="space-y-6 text-base">
                      {menuItems.map((item, index) => (
                        <motion.li
                          key={index}
                          variants={mobileItemVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={item.href}
                            className="text-muted-foreground hover:text-accent-foreground block duration-150"
                          >
                            <span>{item.name}</span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Mobile Buttons */}
                    <motion.div
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: menuItems.length * 0.1 }}
                      className="mt-auto space-y-4"
                    >
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/sign-in">
                          <span>Login</span>
                        </Link>
                      </Button>
                      <Button asChild variant="default" className="w-full bg-zinc-700">
                        <Link href="/sign-up">
                          <span>Sign Up</span>
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme}
                        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        className="w-full justify-start"
                      >
                        <Sun className={cn("size-5 mr-2 transition-all", isDark && "rotate-90 scale-0 opacity-0")} />
                        <Moon className={cn("size-5 mr-2 transition-all", !isDark && "-rotate-90 scale-0 opacity-0")} />
                        {isDark ? "Light Mode" : "Dark Mode"}
                      </Button>
                    </motion.div>
                  </motion.div>
                </SheetContent>
              </Sheet>

              {/* Desktop Menu */}
              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex lg:w-fit lg:gap-6 lg:items-center">
              <Button asChild variant="outline" size="sm">
                <Link href="/sign-in">
                  <span>Login</span>
                </Link>
              </Button>
              <Button asChild size="sm" variant="default" className="bg-zinc-700">
                <Link href="/sign-up">
                  <span>Sign Up</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className="relative"
              >
                <Sun className={cn("size-5 transition-all", isDark && "rotate-90 scale-0 opacity-0")} />
                <Moon className={cn("size-5 absolute transition-all", !isDark && "-rotate-90 scale-0 opacity-0")} />
              </Button>
            </div>
          </motion.div>
        </div>
      </nav>
    </header>
  );
};