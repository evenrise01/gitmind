"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="bg-gray-50 py-16 dark:bg-transparent md:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative">
          <div className="text-center">
            <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
              Built to cover your needs
            </h2>
            <p className="mb-4 mt-4 pb-8">
              Unlock the power of AI-driven tools designed for speed, security,
              and collaboration.
            </p>
          </div>
          <div className="relative z-10 grid grid-cols-6 gap-3">
            {/* Feature 1: Powered by AI */}
            <Card className="relative col-span-full flex overflow-hidden rounded-xl bg-gray-50 dark:bg-transparent lg:col-span-2">
              <CardContent className="relative flex h-full w-full flex-col items-center justify-center p-6">
                <div className="flex h-32 w-64 items-center justify-center">
                  <svg
                    className="text-primary-600 dark:text-primary-400 size-[6rem] sm:size-[8rem]"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Central CPU chip */}
                    <rect
                      x="25"
                      y="25"
                      width="50"
                      height="50"
                      rx="2"
                      className="fill-slate-200 dark:fill-slate-700"
                      stroke="currentColor"
                      strokeWidth="2"
                    />

                    {/* CPU grid lines */}
                    <path
                      d="M35 25 L35 75 M45 25 L45 75 M55 25 L55 75 M65 25 L65 75"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      opacity="0.5"
                    />
                    <path
                      d="M25 35 L75 35 M25 45 L75 45 M25 55 L75 55 M25 65 L75 65"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      opacity="0.5"
                    />

                    {/* Central processor core with animation */}
                    <rect
                      x="40"
                      y="40"
                      width="20"
                      height="20"
                      className="fill-primary-500 dark:fill-primary-400"
                      opacity="0.8"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.8;1;0.8"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </rect>

                    {/* Connection lines from CPU to outer pins */}
                    <path
                      d="M25 35 L10 35 M25 45 L10 45 M25 55 L10 55 M25 65 L10 65"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      opacity="0.7"
                      className="stroke-primary-500 dark:stroke-primary-400"
                    />
                    <path
                      d="M75 35 L90 35 M75 45 L90 45 M75 55 L90 55 M75 65 L90 65"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      opacity="0.7"
                      className="stroke-primary-500 dark:stroke-primary-400"
                    />
                    <path
                      d="M35 25 L35 10 M45 25 L45 10 M55 25 L55 10 M65 25 L65 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      opacity="0.7"
                      className="stroke-primary-500 dark:stroke-primary-400"
                    />
                    <path
                      d="M35 75 L35 90 M45 75 L45 90 M55 75 L55 90 M65 75 L65 90"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      opacity="0.7"
                      className="stroke-primary-500 dark:stroke-primary-400"
                    />

                    {/* Animated data flow pulses */}
                    <circle
                      cx="10"
                      cy="35"
                      r="2"
                      className="fill-primary-500 dark:fill-primary-400"
                    >
                      <animate
                        attributeName="opacity"
                        values="0;1;0"
                        dur="1.5s"
                        repeatCount="indefinite"
                        begin="0s"
                      />
                    </circle>
                    <circle
                      cx="10"
                      cy="55"
                      r="2"
                      className="fill-primary-500 dark:fill-primary-400"
                    >
                      <animate
                        attributeName="opacity"
                        values="0;1;0"
                        dur="1.5s"
                        repeatCount="indefinite"
                        begin="0.3s"
                      />
                    </circle>
                    <circle
                      cx="90"
                      cy="45"
                      r="2"
                      className="fill-primary-500 dark:fill-primary-400"
                    >
                      <animate
                        attributeName="opacity"
                        values="0;1;0"
                        dur="1.5s"
                        repeatCount="indefinite"
                        begin="0.6s"
                      />
                    </circle>
                    <circle
                      cx="90"
                      cy="65"
                      r="2"
                      className="fill-primary-500 dark:fill-primary-400"
                    >
                      <animate
                        attributeName="opacity"
                        values="0;1;0"
                        dur="1.5s"
                        repeatCount="indefinite"
                        begin="0.9s"
                      />
                    </circle>
                    <circle
                      cx="45"
                      cy="10"
                      r="2"
                      className="fill-primary-500 dark:fill-primary-400"
                    >
                      <animate
                        attributeName="opacity"
                        values="0;1;0"
                        dur="1.5s"
                        repeatCount="indefinite"
                        begin="1.2s"
                      />
                    </circle>
                    <circle
                      cx="65"
                      cy="10"
                      r="2"
                      className="fill-primary-500 dark:fill-primary-400"
                    >
                      <animate
                        attributeName="opacity"
                        values="0;1;0"
                        dur="1.5s"
                        repeatCount="indefinite"
                        begin="1.5s"
                      />
                    </circle>
                    <circle
                      cx="35"
                      cy="90"
                      r="2"
                      className="fill-primary-500 dark:fill-primary-400"
                    >
                      <animate
                        attributeName="opacity"
                        values="0;1;0"
                        dur="1.5s"
                        repeatCount="indefinite"
                        begin="1.8s"
                      />
                    </circle>
                    <circle
                      cx="55"
                      cy="90"
                      r="2"
                      className="fill-primary-500 dark:fill-primary-400"
                    >
                      <animate
                        attributeName="opacity"
                        values="0;1;0"
                        dur="1.5s"
                        repeatCount="indefinite"
                        begin="2.1s"
                      />
                    </circle>

                    {/* Circular background glow */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      className="stroke-primary-500/30 dark:stroke-primary-400/30"
                      strokeWidth="1"
                      fill="none"
                    >
                      <animate
                        attributeName="r"
                        values="45;48;45"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.3;0.5;0.3"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                </div>
                <h2 className="mt-6 text-center text-lg font-semibold text-black dark:text-white">
                  Powered by AI
                </h2>
                <p className="mt-2 text-center text-foreground">
                  Advanced machine learning algorithms working for you
                </p>
              </CardContent>
            </Card>

            {/* Feature 2: Secured Authentication */}
            <Card className="group relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
              <CardContent className="relative pt-6">
                <div className="relative mx-auto flex aspect-square size-32 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                  {/* Static cyan glow background */}
                  <div className="absolute inset-0 rounded-full bg-cyan-500/0 transition-colors duration-300 group-hover:bg-cyan-500/10 dark:group-hover:bg-cyan-400/15"></div>

                  {/* Expanding cyan ring */}
                  <div
                    className="duration-1500 absolute inset-0 scale-0 rounded-full border-2 border-cyan-500/0 opacity-0 transition-all group-hover:scale-125 group-hover:border-cyan-500/40 group-hover:opacity-100 dark:group-hover:border-cyan-400/40"
                    style={{
                      boxShadow: "0 0 0 0 rgba(6, 182, 212, 0)",
                      transition: "all 1.5s",
                    }}
                  ></div>

                  {/* Expanding blue ring with delay */}
                  <div
                    className="duration-2000 group-hover:scale-130 absolute inset-0 scale-0 rounded-full border border-blue-500/0 opacity-0 transition-all delay-300 group-hover:border-blue-500/30 group-hover:opacity-100 dark:group-hover:border-blue-400/30"
                    style={{
                      boxShadow: "0 0 0 0 rgba(59, 130, 246, 0)",
                      transition: "all 2s 0.3s",
                    }}
                  ></div>

                  {/* Pulsating cyan ring effect */}
                  <div
                    className="absolute inset-0 rounded-full border-2 border-cyan-500/0 opacity-0 group-hover:border-cyan-500/50 group-hover:opacity-100 dark:group-hover:border-cyan-400/50"
                    style={{
                      boxShadow: "0 0 0 0 rgba(6, 182, 212, 0)",
                      animation: "none",
                    }}
                  ></div>

                  {/* Shield icon with subtle grow effect and custom color */}
                  <Shield
                    className="m-auto size-12 transition-transform duration-300 group-hover:scale-110 text-cyan-600"
                    strokeWidth={1.5}
                  />

                  {/* CSS keyframes for custom glow animation */}
                  <style jsx>{`
                    @keyframes glow {
                      0% {
                        box-shadow: 0 0 0 0 rgba(6, 182, 212, 0.4);
                      }
                      70% {
                        box-shadow: 0 0 0 10px rgba(6, 182, 212, 0);
                      }
                      100% {
                        box-shadow: 0 0 0 0 rgba(6, 182, 212, 0);
                      }
                    }
                  `}</style>
                </div>
                <div className="relative mt-6 space-y-2 rounded-xl text-center">
                  <h2 className="text-lg font-medium transition dark:text-white">
                    Secured Authentication
                  </h2>
                  <p className="text-foreground">
                    Robust security with advanced authentication to keep your
                    data safe.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Feature 3: Fast */}
            <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
              <CardContent className="relative pt-6">
                <div className="pt-6 lg:px-6">
                  <div className="group relative">
                    <svg
                      className="group-hover:filter-[drop-shadow(0_0_10px_rgba(59,130,246,0.7))] group-hover:dark:filter-[drop-shadow(0_0_10px_rgba(59,130,246,0.5))] w-full transition-all duration-300 ease-in-out dark:text-muted-foreground"
                      viewBox="0 0 386 123"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* SVG remains unchanged */}
                      <rect width="386" height="123" rx="10" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3 123C3 123 14.3298 94.153 35.1282 88.0957C55.9266 82.0384 65.9333 80.5508 65.9333 80.5508C65.9333 80.5508 80.699 80.5508 92.1777 80.5508C103.656 80.5508 100.887 63.5348 109.06 63.5348C117.233 63.5348 117.217 91.9728 124.78 91.9728C132.343 91.9728 142.264 78.03 153.831 80.5508C165.398 83.0716 186.825 91.9728 193.761 91.9728C200.697 91.9728 206.296 63.5348 214.07 63.5348C221.844 63.5348 238.653 93.7771 244.234 91.9728C249.814 90.1684 258.8 60 266.19 60C272.075 60 284.1 88.057 286.678 88.0957C294.762 88.2171 300.192 72.9284 305.423 72.9284C312.323 72.9284 323.377 65.2437 335.553 63.5348C347.729 61.8259 348.218 82.07 363.639 80.5508C367.875 80.1335 372.949 82.2017 376.437 87.1008C379.446 91.3274 381.054 97.4325 382.521 104.647C383.479 109.364 382.521 123 382.521 123"
                        fill="url(#paint0_linear_0_106)"
                      />
                      <path
                        className="text-primary-600 dark:text-primary-500"
                        d="M3 121.077C3 121.077 15.3041 93.6691 36.0195 87.756C56.7349 81.8429 66.6632 80.9723 66.6632 80.9723C66.6632 80.9723 80.0327 80.9723 91.4656 80.9723C102.898 80.9723 100.415 64.2824 108.556 64.2824C116.696 64.2824 117.693 92.1332 125.226 92.1332C132.759 92.1332 142.07 78.5115 153.591 80.9723C165.113 83.433 186.092 92.1332 193 92.1332C199.908 92.1332 205.274 64.2824 213.017 64.2824C220.76 64.2824 237.832 93.8946 243.39 92.1332C248.948 90.3718 257.923 60.5 265.284 60.5C271.145 60.5 283.204 87.7182 285.772 87.756C293.823 87.8746 299.2 73.0802 304.411 73.0802C311.283 73.0802 321.425 65.9506 333.552 64.2824C345.68 62.6141 346.91 82.4553 362.27 80.9723C377.629 79.4892 383 106.605 383 106.605"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_0_106"
                          x1="3"
                          y1="60"
                          x2="3"
                          y2="123"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop
                            className="text-primary/15 dark:text-primary/35"
                            stopColor="currentColor"
                          />
                          <stop
                            className="text-transparent"
                            offset="1"
                            stopColor="currentColor"
                            stopOpacity="0.103775"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="relative mt-14 space-y-2 rounded-xl text-center">
                  <h2 className="text-lg font-medium transition dark:text-white">
                    Lightning Fast
                  </h2>
                  <p className="text-foreground">
                    Experience blazing-fast performance optimized for
                    efficiency.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Feature 4: Shared Collaboration */}
            <Card className="relative col-span-full overflow-hidden rounded-xl lg:col-span-3">
              <CardContent className="grid pt-6 sm:grid-cols-2">
                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                  <div className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                    <Users className="m-auto size-6" strokeWidth={1} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-lg font-medium transition dark:text-white">
                      Shared Collaboration
                    </h2>
                    <p className="text-foreground">
                      Invite team members to collaborate seamlessly in
                      real-time.
                    </p>
                  </div>
                </div>
                <div className="relative -mb-6 -mr-6 mt-6 h-fit border-l border-t p-6 py-6 sm:ml-6">
                  <div className="absolute left-3 top-2 flex gap-1">
                    <span className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"></span>
                    <span className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"></span>
                    <span className="block size-2 rounded-full border dark:border-white/10 dark:bg-white/10"></span>
                  </div>
                  <svg
                    className="w-full sm:w-[150%]"
                    viewBox="0 0 366 231"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* New SVG: User icons and Git commit structure */}
                    {/* User Icons */}
                    <g transform="translate(20, 20)">
                      <circle
                        cx="20"
                        cy="20"
                        r="15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        opacity="0.5"
                      />
                      <path
                        d="M20 10 V15 M20 25 V30"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        opacity="0.5"
                      />
                      <path
                        d="M15 20 H25"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        opacity="0.5"
                      />
                    </g>
                    <g transform="translate(60, 10)">
                      <circle
                        cx="20"
                        cy="20"
                        r="15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        opacity="0.5"
                      />
                      <path
                        d="M20 10 V15 M20 25 V30"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        opacity="0.5"
                      />
                      <path
                        d="M15 20 H25"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        opacity="0.5"
                      />
                    </g>
                    <g transform="translate(100, 25)">
                      <circle
                        cx="20"
                        cy="20"
                        r="15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        opacity="0.5"
                      />
                      <path
                        d="M20 10 V15 M20 25 V30"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        opacity="0.5"
                      />
                      <path
                        d="M15 20 H25"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        opacity="0.5"
                      />
                    </g>

                    {/* Git Commit Structure */}
                    <path
                      d="M50 80 H150 M150 80 V120 M150 120 H200 M200 120 V160 M150 120 V200"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.6"
                      className="text-primary-600 dark:text-primary-500"
                    />
                    {/* Commit Nodes */}
                    <circle
                      cx="50"
                      cy="80"
                      r="5"
                      fill="currentColor"
                      opacity="0.8"
                      className="text-primary-600 dark:text-primary-500"
                    />
                    <circle
                      cx="150"
                      cy="80"
                      r="5"
                      fill="currentColor"
                      opacity="0.8"
                      className="text-primary-600 dark:text-primary-500"
                    />
                    <circle
                      cx="150"
                      cy="120"
                      r="5"
                      fill="currentColor"
                      opacity="0.8"
                      className="text-primary-600 dark:text-primary-500"
                    />
                    <circle
                      cx="200"
                      cy="120"
                      r="5"
                      fill="currentColor"
                      opacity="0.8"
                      className="text-primary-600 dark:text-primary-500"
                    />
                    <circle
                      cx="150"
                      cy="160"
                      r="5"
                      fill="currentColor"
                      opacity="0.8"
                      className="text-primary-600 dark:text-primary-500"
                    />
                    <circle
                      cx="150"
                      cy="200"
                      r="5"
                      fill="currentColor"
                      opacity="0.8"
                      className="text-primary-600 dark:text-primary-500"
                    />

                    {/* Connecting lines from users to commits */}
                    <path
                      d="M35 35 Q50 50, 50 80 M75 30 Q100 50, 150 80 M115 45 Q140 70, 150 120"
                      stroke="currentColor"
                      strokeWidth="1"
                      opacity="0.4"
                      strokeDasharray="4"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>

            {/* Feature 5: Codebase Knowledge */}
            <Card className="relative col-span-full overflow-hidden lg:col-span-3">
              <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                  <div className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                    <svg
                      className="m-auto size-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2L2 7v10l10 5 10-5V7L12 2zm-1 13.59L6.41 13 5 14.41 11 18l6-3.59L18.59 13 14 15.59V7h-4v8.59z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="relative space-y-2 rounded-xl">
                    <h2 className="text-lg font-medium transition dark:text-white">
                      Codebase Knowledge
                    </h2>
                    <p className="text-foreground">
                      Leverage deep insights into your codebase with AI-powered
                      analysis.
                    </p>
                  </div>
                </div>
                <div className="before:bg-(--color-border) relative mt-6 before:absolute before:inset-0 before:mx-auto before:w-px sm:-my-6 sm:-mr-6">
                  <div className="relative flex h-full flex-col justify-center space-y-6 py-6">
                    <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                      <span className="block h-fit rounded border px-2 py-1 text-xs shadow-sm">
                        File
                      </span>
                      <div className="size-7 ring-4 ring-background">
                        <svg
                          className="size-full"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h6v6h6v10H6z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="relative ml-[calc(50%-1rem)] flex items-center gap-2">
                      <div className="size-8 ring-4 ring-background">
                        <svg
                          className="size-full"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2a10 10 0 100 20 10 10 0 000-20zm-2 14.5v-9l6 4.5-6 4.5z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <span className="block h-fit rounded border px-2 py-1 text-xs shadow-sm">
                        Script
                      </span>
                    </div>
                    <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2">
                      <span className="block h-fit rounded border px-2 py-1 text-xs shadow-sm">
                        Module
                      </span>
                      <div className="size-7 ring-4 ring-background">
                        <svg
                          className="size-full"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2zm0 4h5v2H8v-2z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative col-span-full overflow-hidden rounded-xl lg:col-span-6">
              <CardContent className="grid h-full pt-6 sm:grid-cols-2">
                <div className="relative z-10 flex flex-col justify-between space-y-12 lg:space-y-6">
                  <div className="relative flex aspect-square size-12 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                    <svg
                      className="m-auto size-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* New Icon: Microphone (representing meetings/transcription) */}
                      <path
                        d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9h2v6h-2V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-lg font-medium transition dark:text-white">
                      AI-Powered Meeting Insights
                    </h2>
                    <p className="text-foreground">
                      Gitmind analyzes your meetings with AI to create concise
                      summaries, shareable with your team for quick review of
                      key points and action items.
                    </p>
                  </div>
                </div>
                <div className="before:bg-(--color-border) relative mt-6 before:absolute before:inset-0 before:mx-auto before:w-px sm:-my-6 sm:-mr-6">
                  <div className="relative flex h-full flex-col justify-center space-y-6 py-6">
                    <svg
                      className="mx-auto h-auto max-h-48 w-full"
                      viewBox="0 0 200 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Clean waveform representation */}
                      <path
                        d="M20 100 Q30 80, 40 100 Q50 120, 60 90 Q70 60, 80 100 Q90 140, 100 80 
       Q110 20, 120 100 Q130 180, 140 100 Q150 20, 160 100 Q170 180, 180 100"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-primary-600 dark:text-primary-400"
                      />

                      {/* Three key AI processing nodes */}
                      <circle
                        cx="60"
                        cy="140"
                        r="6"
                        fill="currentColor"
                        className="text-primary-700 dark:text-primary-300"
                      />
                      <circle
                        cx="100"
                        cy="120"
                        r="6"
                        fill="currentColor"
                        className="text-primary-700 dark:text-primary-300"
                      />
                      <circle
                        cx="140"
                        cy="140"
                        r="6"
                        fill="currentColor"
                        className="text-primary-700 dark:text-primary-300"
                      />

                      {/* Simple connecting line between nodes */}
                      <path
                        d="M60 140 Q80 130, 100 120 Q120 110, 140 140"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        className="text-primary-600 dark:text-primary-400"
                        strokeDasharray="3"
                      />

                      {/* Minimal transcript lines */}
                      <rect
                        x="40"
                        y="30"
                        width="120"
                        height="6"
                        rx="3"
                        fill="currentColor"
                        className="text-primary-700 dark:text-primary-300"
                        opacity="0.7"
                      />
                      <rect
                        x="60"
                        y="45"
                        width="80"
                        height="6"
                        rx="3"
                        fill="currentColor"
                        className="text-primary-700 dark:text-primary-300"
                        opacity="0.7"
                      />
                      <rect
                        x="50"
                        y="60"
                        width="100"
                        height="6"
                        rx="3"
                        fill="currentColor"
                        className="text-primary-700 dark:text-primary-300"
                        opacity="0.7"
                      />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
