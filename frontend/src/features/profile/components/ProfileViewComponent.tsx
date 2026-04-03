import React from "react";
import type { Profile } from "../data/types";
import { PrimaryOutlinedButton } from "../../../components/buttons/PrimaryOutlinedButton";

interface ProfileViewComponentProps {
  profile: Profile;
  onEdit: () => void;
}

export const ProfileViewComponent: React.FC<ProfileViewComponentProps> = ({ profile, onEdit }) => {
  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
          <p className="text-gray-500 mt-1">Manage your personal and company details.</p>
        </div>
        <PrimaryOutlinedButton onClick={onEdit} className="self-start sm:self-auto">
          Edit Profile
        </PrimaryOutlinedButton>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50/50 rounded-2xl p-6 md:p-8 border border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-50">
              <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">First Name</p>
              <p className="text-lg font-medium text-gray-900">{profile.firstName}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-50">
              <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">Last Name</p>
              <p className="text-lg font-medium text-gray-900">{profile.lastName || "—"}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-50">
              <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">Email Address</p>
              <p className="text-lg font-medium text-gray-900 truncate max-w-full" title={profile.email}>{profile.email}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-50">
              <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-1">Company Name</p>
              <p className="text-lg font-medium text-gray-900 truncate max-w-full" title={profile.companyName}>{profile.companyName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
