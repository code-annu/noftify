import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextInputField } from "../../../components/inputs/TextInputField";
import { PrimaryButton } from "../../../components/buttons/PrimaryButton";
import { AppRoutes } from "../../../router/router";
import useProfileMutation from "../hooks/useProfileMutations";

export const CreateProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { createProfile, creatingProfile, createError } = useProfileMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await createProfile(formData);
    if (created) {
      navigate(AppRoutes.PROFILE);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white p-8 sm:p-10 transition-all duration-300">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 transform rotate-[-3deg] mx-auto mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create Profile
          </h1>
          <p className="text-gray-500 font-medium mt-2">
            Let's get to know you better
          </p>
        </div>

        {createError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm font-medium">
            {createError.error?.message || "Failed to create profile"}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <TextInputField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="e.g. John"
            required
          />
          <TextInputField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="e.g. Doe"
          />
          <TextInputField
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. Acme Corp"
            required
          />

          <div className="pt-4">
            <PrimaryButton
              type="submit"
              isLoading={creatingProfile}
              className="w-full py-2.5"
            >
              Complete Profile
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};
