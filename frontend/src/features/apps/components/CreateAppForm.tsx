import React, { useState } from "react";
import { TextInputField } from "../../../components/inputs/TextInputField";
import { PrimaryButton } from "../../../components/buttons/PrimaryButton";
import { PrimaryOutlinedButton } from "../../../components/buttons/PrimaryOutlinedButton";
import type { AppCreateRequestBody } from "../data/types";
import type { NoftifyError } from "../../../util/ErrorHandlerUtil";

interface CreateAppFormProps {
  onSubmit: (data: AppCreateRequestBody) => Promise<void> | void;
  onCancel: () => void;
  isLoading: boolean;
  error: NoftifyError | null;
}

export const CreateAppForm: React.FC<CreateAppFormProps> = ({
  onSubmit,
  onCancel,
  isLoading,
  error,
}) => {
  const [formData, setFormData] = useState<AppCreateRequestBody>({
    name: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-100 text-red-700 rounded-lg text-sm">
          {error.error?.message || "An error occurred while creating the app"}
        </div>
      )}

      <TextInputField
        label="App Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="e.g. My NextJS App"
        required
      />

      <div className="flex flex-col gap-1.5">
        <label className="block text-sm font-semibold text-gray-700 outline-none">
          Description (Optional)
        </label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          rows={3}
          placeholder="Brief description of your app..."
          className="w-full px-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-gray-900 outline-none resize-none"
        />
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-100 justify-end">
        <PrimaryOutlinedButton
          type="button"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </PrimaryOutlinedButton>
        <PrimaryButton type="submit" isLoading={isLoading}>
          Create App
        </PrimaryButton>
      </div>
    </form>
  );
};
