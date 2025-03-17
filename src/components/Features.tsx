import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section
      id="#features"
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
            <Card className="relative col-span-full flex overflow-hidden rounded-xl lg:col-span-2">
              <CardContent className="relative m-auto size-fit pt-6">
                <div className="relative flex h-24 w-56 items-center justify-center">
                  <svg
                    className="size-16 text-muted" // 64px x 64px
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Outer chip boundary */}
                    <rect
                      x="10"
                      y="10"
                      width="80"
                      height="80"
                      rx="4"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.3"
                    />

                    {/* Intricate circuit paths with glow and hue */}
                    <path
                      className="glow-effect stroke-[#4c7894]"
                      d="M20 25 H40 V35 H30 V45 H50 M60 25 H80 V35 H70 V45 H50 M30 55 H70 V65 H50 V75 H60"
                      strokeWidth="1.5"
                      opacity="0.8"
                    />
                    <path
                      className="glow-effect stroke-[#4c7894]"
                      d="M40 35 H60 M50 45 H70 M40 65 H60 M20 75 H40 M60 75 H80"
                      strokeWidth="1"
                      opacity="0.7"
                    />

                    {/* Additional circuit details */}
                    <path
                      className="glow-effect stroke-[#4c7894]"
                      d="M25 30 H35 V40 M65 30 H75 V40 M45 50 H55 V60"
                      strokeWidth="1"
                      opacity="0.6"
                    />

                    {/* Chip components (rectangles and squares) */}
                    <rect
                      x="42"
                      y="28"
                      width="6"
                      height="6"
                      fill="currentColor"
                      opacity="0.4"
                    />
                    <rect
                      x="52"
                      y="28"
                      width="6"
                      height="6"
                      fill="currentColor"
                      opacity="0.4"
                    />
                    <rect
                      x="35"
                      y="48"
                      width="8"
                      height="5"
                      fill="currentColor"
                      opacity="0.3"
                    />
                    <rect
                      x="65"
                      y="48"
                      width="8"
                      height="5"
                      fill="currentColor"
                      opacity="0.3"
                    />
                    <rect
                      x="45"
                      y="68"
                      width="5"
                      height="5"
                      fill="currentColor"
                      opacity="0.35"
                    />
                    <rect
                      x="55"
                      y="68"
                      width="5"
                      height="5"
                      fill="currentColor"
                      opacity="0.35"
                    />

                    {/* Pins on all sides for more complexity */}
                    <rect
                      x="5"
                      y="30"
                      width="5"
                      height="8"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <rect
                      x="5"
                      y="45"
                      width="5"
                      height="8"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <rect
                      x="5"
                      y="60"
                      width="5"
                      height="8"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <rect
                      x="90"
                      y="30"
                      width="5"
                      height="8"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <rect
                      x="90"
                      y="45"
                      width="5"
                      height="8"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <rect
                      x="90"
                      y="60"
                      width="5"
                      height="8"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <rect
                      x="30"
                      y="5"
                      width="8"
                      height="5"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <rect
                      x="45"
                      y="5"
                      width="8"
                      height="5"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <rect
                      x="60"
                      y="5"
                      width="8"
                      height="5"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <rect
                      x="30"
                      y="90"
                      width="8"
                      height="5"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <rect
                      x="45"
                      y="90"
                      width="8"
                      height="5"
                      fill="currentColor"
                      opacity="0.5"
                    />
                    <rect
                      x="60"
                      y="90"
                      width="8"
                      height="5"
                      fill="currentColor"
                      opacity="0.5"
                    />
                  </svg>
                </div>
                <h2 className="mt-6 text-center text-3xl font-semibold text-black dark:text-white">
                  Powered by AI
                </h2>
              </CardContent>
            </Card>

            {/* Feature 2: Secured Authentication */}
            <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2">
              <CardContent className="relative pt-6">
                <div className="relative mx-auto flex aspect-square size-32 rounded-full border before:absolute before:-inset-2 before:rounded-full before:border dark:border-white/10 dark:before:border-white/5">
                  <Shield className="m-auto size-12" strokeWidth={1} />
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
                  <svg
                    className="w-full dark:text-muted-foreground"
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
                      {/* New SVG: AI-generated meeting transcripts */}
                      {/* Waveform-like lines representing audio/speech */}
                      <path
                        d="M20 100 H40 V120 H60 V80 H80 V140 H100 V60 H120 V160 H140 V40 H160 V180 H180"
                        stroke="currentColor"
                        strokeWidth="2"
                        opacity="0.5"
                        className="text-muted"
                      />
                      {/* AI processing nodes */}
                      <circle
                        cx="50"
                        cy="150"
                        r="8"
                        fill="currentColor"
                        opacity="0.8"
                        className="text-primary-600 dark:text-primary-500"
                      />
                      <circle
                        cx="100"
                        cy="130"
                        r="8"
                        fill="currentColor"
                        opacity="0.8"
                        className="text-primary-600 dark:text-primary-500"
                      />
                      <circle
                        cx="150"
                        cy="150"
                        r="8"
                        fill="currentColor"
                        opacity="0.8"
                        className="text-primary-600 dark:text-primary-500"
                      />
                      {/* Connecting lines to suggest AI analysis */}
                      <path
                        d="M50 150 Q75 140, 100 130 Q125 120, 150 150"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        opacity="0.6"
                        className="text-primary-600 dark:text-primary-500"
                        strokeDasharray="4"
                      />
                      {/* Transcript output (simplified text lines) */}
                      <rect
                        x="40"
                        y="20"
                        width="120"
                        height="8"
                        fill="currentColor"
                        opacity="0.4"
                        className="text-muted"
                      />
                      <rect
                        x="60"
                        y="35"
                        width="80"
                        height="8"
                        fill="currentColor"
                        opacity="0.4"
                        className="text-muted"
                      />
                      <rect
                        x="50"
                        y="50"
                        width="100"
                        height="8"
                        fill="currentColor"
                        opacity="0.4"
                        className="text-muted"
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
