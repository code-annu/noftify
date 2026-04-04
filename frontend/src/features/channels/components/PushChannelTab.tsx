import React from "react";
import { PrimaryButton } from "../../../components/buttons/PrimaryButton";

interface PushChannelTabProps {
  appId: string;
}

const PushChannelTab: React.FC<PushChannelTabProps> = ({ appId }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("App ID for push channel:", appId);
    alert("Push channel setup is currently under construction.");
  };

  return (
    <div className="space-y-6 text-center py-10">
      <div className="mx-auto w-16 h-16 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900">Coming Soon</h3>
      <p className="text-gray-500 max-w-md mx-auto">
        Push notification support is currently in development. You will soon be able to configure FCM and APNs providers here.
      </p>
      <form onSubmit={handleSubmit} className="pt-4">
        <PrimaryButton type="submit" disabled className="mx-auto select-none opacity-50">
          Configure Push Channel
        </PrimaryButton>
      </form>
    </div>
  );
};

export default PushChannelTab;
