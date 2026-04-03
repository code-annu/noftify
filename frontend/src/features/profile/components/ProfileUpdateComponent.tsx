import React, { useState } from "react";
import type { Profile } from "../data/types";
import { TextInputField } from "../../../components/inputs/TextInputField";
import { PrimaryButton } from "../../../components/buttons/PrimaryButton";
import { PrimaryOutlinedButton } from "../../../components/buttons/PrimaryOutlinedButton";
import useProfileMutation from "../hooks/useProfileMutations";

interface ProfileUpdateComponentProps {
  profile: Profile;
  onCancel: () => void;
  onSave: () => void;
}

export const ProfileUpdateComponent: React.FC<ProfileUpdateComponentProps> = ({
  profile,
  onCancel,
  onSave,
}) => {
  const { updateProfile, updatingProfile, updateError } = useProfileMutation();

  const [formData, setFormData] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName || "",
    companyName: profile.companyName,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = await updateProfile(formData);
    if (updated) {
      onSave();
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
        <p className="text-gray-500 mt-1">
          Update your personal information below.
        </p>
      </div>

      {updateError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm">
          {updateError.error?.message || "Failed to update profile"}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
        <TextInputField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <TextInputField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextInputField
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />

        <div className="flex gap-4 pt-6 mt-4 border-t border-gray-100 self-end w-full sm:w-auto">
          <PrimaryOutlinedButton
            type="button"
            onClick={onCancel}
            disabled={updatingProfile}
            className="w-full sm:w-auto px-6"
          >
            Cancel
          </PrimaryOutlinedButton>
          <PrimaryButton
            type="submit"
            isLoading={updatingProfile}
            className="w-full sm:w-auto px-6"
          >
            Save Changes
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};
