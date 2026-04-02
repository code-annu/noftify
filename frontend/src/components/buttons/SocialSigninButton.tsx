import React from "react";

interface SocialSigninButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const SocialSigninButton: React.FC<SocialSigninButtonProps> = ({
  children,
  className = "",
  isLoading = false,
  disabled,
  icon,
  ...props
}) => {
  const isButtonDisabled = disabled || isLoading;

  return (
    <button
      disabled={isButtonDisabled}
      className={`
        flex items-center justify-center gap-3 w-full
        px-4 py-2.5
        bg-white hover:bg-gray-50
        border border-gray-300
        text-gray-700 font-medium
        active:bg-gray-100
        rounded-lg
        transition-colors duration-200
        cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1
        shadow-sm
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : icon ? (
        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </button>
  );
};
