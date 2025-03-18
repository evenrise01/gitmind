import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn("size-7 w-7", className)}
      viewBox="0 0 71 50" // Increased height from 25 to 50
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Define the purple gradient */}
      <defs>
        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#C7B7FF", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#6A4AFF", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      <path
        d="M35.5 0 L71 50 H0 Z" // Adjusted to use full height of 50
        fill="url(#purpleGradient)" // Apply the gradient
      />
    </svg>
  );
};

export const LogoStroke = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn("size-7 w-7", className)}
      viewBox="0 0 71 50" // Increased height from 25 to 50
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Define the purple gradient */}
      <defs>
        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#C7B7FF", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#6A4AFF", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      <path
        d="M35.5 0 L71 50 H0 Z" // Adjusted to use full height of 50
        fill="none"
        stroke="url(#purpleGradient)" // Apply gradient to stroke
        strokeWidth={0.5}
      />
    </svg>
  );
};