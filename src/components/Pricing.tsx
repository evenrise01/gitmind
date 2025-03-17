'use client'
import Link from "next/link";
import { SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  Sparkles,
  CreditCard,
  Coins,
  ChevronUp,
  ChevronDown,
  FileText,
  GitBranch,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Pricing() {
  const [credits, setCredits] = useState(100);
  const [repoSize, setRepoSize] = useState(100);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index: number | SetStateAction<null>) => {
    //@ts-ignore
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Updated credit packages to match the pricing from the Billing page
  // Using the formula: price = (credits / 50).toFixed(2)
  const creditPackages = [
    { amount: 100, price: (100 / 50).toFixed(2), popular: false },
    { amount: 250, price: (250 / 50).toFixed(2), popular: true },
    { amount: 500, price: (500 / 50).toFixed(2), popular: false },
  ];

  const faqs = [
    {
      question: "How do credits work?",
      answer:
        "Each file indexed in a repository costs 1 credit. For example, a repository with 50 files will cost 50 credits to index.",
    },
    {
      question: "Do credits expire?",
      answer:
        "No, once purchased, your credits don't expire and remain in your account until used.",
    },
    {
      question: "What happens when I run out of credits?",
      answer:
        "You'll need to purchase more credits to index additional repositories. Already indexed repositories will remain accessible.",
    },
    {
      question: "Can I use credits across multiple repositories?",
      answer:
        "Yes, your credits can be used across any number of repositories until they're depleted.",
    },
  ];

  const calculateReposEnabled = (credits: number, avgSize: number) => {
    // Number of repositories possible with current credits based on avg repo size
    return Math.floor(credits / avgSize);
  };

  return (
    <section id = "#pricing" className="bg-gradient-to-b from-background to-background/80 py-16 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-center text-4xl font-semibold lg:text-5xl">
              Pricing that Scales with You
            </h1>
            <p className="mt-4 text-muted-foreground">
              GitMind uses a flexible credit system that lets you pay only for
              what you use.
            </p>
          </motion.div>

          <motion.div
            className="pb-4 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="border border-purple-200/20 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Coins className="h-5 w-5 text-purple-400" />
                  Credit Calculator
                </CardTitle>
                <CardDescription>
                  Estimate how many repositories you can index with your credits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Credits Available
                      </span>
                      <Badge
                        variant="outline"
                        className="border-purple-400/20 bg-purple-500/10 text-purple-400"
                      >
                        <motion.span
                          key={credits}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {credits} credits
                        </motion.span>
                      </Badge>
                    </div>
                    <Slider
                      defaultValue={[100]}
                      max={1000}
                      step={10}
                      value={[credits]}
                      onValueChange={(value) => setCredits(value[0]!)}
                      className="py-4"
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Average Files per Repository
                      </span>
                      <Badge
                        variant="outline"
                        className="border-blue-400/20 bg-blue-500/10 text-blue-400"
                      >
                        <motion.span
                          key={repoSize}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {repoSize} files
                        </motion.span>
                      </Badge>
                    </div>
                    <Slider
                      defaultValue={[100]}
                      max={500}
                      step={10}
                      value={[repoSize]}
                      onValueChange={(value) => setRepoSize(value[0]!)}
                      className="py-4"
                    />
                  </div>

                  <motion.div
                    className="flex items-center justify-between rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-4"
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-purple-500/20 p-2">
                        <GitBranch className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">
                          Repositories you can index
                        </span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                className="ml-1 h-4 w-4 p-0"
                              >
                                <span className="text-xs text-muted-foreground">
                                  ?
                                </span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">
                                Based on your average repository size
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    <div className="text-right">
                      <motion.span
                        key={`${credits}-${repoSize}`}
                        className="text-2xl font-semibold text-purple-400"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {calculateReposEnabled(credits, repoSize)}
                      </motion.span>
                    </div>
                  </motion.div>

                  <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/10 p-3 text-sm">
                    <div className="flex items-start gap-2">
                      <FileText className="mt-0.5 h-4 w-4 text-indigo-400" />
                      <p className="text-muted-foreground">
                        Each file indexed costs 1 credit. A typical small
                        repository (~{repoSize} files) would cost {repoSize}{" "}
                        credits to index.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">
          {creditPackages.map((pkg, i) => (
            <motion.div
              key={`pkg-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            >
              <Card
                className={`relative flex h-full flex-col ${pkg.popular ? "border-purple-500/30 shadow-lg shadow-purple-500/5" : ""}`}
              >
                {pkg.popular && (
                  <span className="absolute inset-x-0 -top-3 mx-auto flex h-6 w-fit items-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-white/20">
                    Most Popular
                  </span>
                )}

                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-medium">
                    <Coins className="h-4 w-4 text-purple-400" />
                    {pkg.amount} Credits
                  </CardTitle>
                  <span className="my-3 block text-2xl font-semibold">
                    ${pkg.price}
                  </span>
                  <CardDescription className="text-sm">
                    One-time purchase
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <hr className="border-dashed" />

                  <ul className="list-outside space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="size-3 text-green-500" />
                      Index up to {pkg.amount} files across any repositories
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="size-3 text-green-500" />
                      {Math.floor(pkg.amount / 100)} average-sized repositories
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="size-3 text-green-500" />
                      No expiration date
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="size-3 text-green-500" />
                      Full features access
                    </li>
                  </ul>
                </CardContent>

                <CardFooter className="mt-auto">
                  <Button
                    asChild
                    className={`w-full ${pkg.popular ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600" : "variant-outline"}`}
                  >
                    <Link
                      href="/billing"
                      className="flex items-center justify-center gap-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      Buy Credits
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mx-auto mt-16 max-w-3xl rounded-xl border border-indigo-500/10 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-full bg-indigo-500/20 p-3">
              <Sparkles className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium">
                How Our Credit System Works
              </h3>
              <p className="mb-3 text-sm text-muted-foreground">
                GitMind uses a simple, transparent credit system for repository
                indexing.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="mt-1 size-3 text-green-500" />
                  <span>Each file indexed in a repository costs 1 credit</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-1 size-3 text-green-500" />
                  <span>
                    Credits are only consumed when you index a new repository
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-1 size-3 text-green-500" />
                  <span>
                    Pay only for what you use - no monthly subscriptions
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <div className="mx-auto mt-24 max-w-3xl">
          <h2 className="mb-8 text-center text-2xl font-semibold">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={`faq-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              >
                <Card className="overflow-hidden">
                  <div
                    className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-muted/50"
                    onClick={() => toggleFaq(i)}
                  >
                    <h3 className="font-medium">{faq.question}</h3>
                    {expandedFaq === i ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                  <AnimatePresence>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="pb-6 pt-0 text-sm text-muted-foreground">
                          {faq.answer}
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="link"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Need bulk credits for large repositories?
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Contact our sales team for volume discounts</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </div>
    </section>
  );
}
