import React from "react";

/**
 *  UI: border magic from tailwind css btns
 *  Link: https://ui.aceternity.com/components/tailwindcss-buttons
 *
 *  change border radius to rounded-lg
 *  add margin of md:mt-10
 *  remove focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50
 */
const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  disabled = false,
  otherClasses,
}: {
  title: string;
  icon?: React.ReactNode;
  position: string;
  handleClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  otherClasses?: string;
}) => {
  return (
    <button
      className={`sm:w-auto relative inline-flex h-12 w-full md:w-60 md:mt-5 overflow-hidden rounded-lg p-[2px] focus:outline-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={(e) => {
        if (!disabled && handleClick) {
          handleClick(e);
        }
      }}
      disabled={disabled} // Native HTML disabled attribute for accessibility
    >
      <span
        className={`absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#0077FF_50%,#E2CBFF_100%)]`}
      />

      <span
        className={`inline-flex h-full w-full items-center justify-center rounded-lg bg-background px-7 text-sm font-medium text-foreground backdrop-blur-3xl gap-2 ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        } ${otherClasses} dark:bg-opacity-90 dark:text-white`}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </button>
  );
};

export default MagicButton;