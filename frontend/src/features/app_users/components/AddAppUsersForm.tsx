import React, { useState } from "react";
import { TextInputField } from "../../../components/inputs/TextInputField";
import { PrimaryButton } from "../../../components/buttons/PrimaryButton";
import { PrimaryOutlinedButton } from "../../../components/buttons/PrimaryOutlinedButton";
import type { AppUserAddRequestBody } from "../data/types";
import type { NoftifyError } from "../../../util/ErrorHandlerUtil";

interface AddAppUsersFormProps {
  onSubmit: (data: AppUserAddRequestBody) => Promise<void> | void;
  onCancel: () => void;
  isLoading: boolean;
  error: NoftifyError | null;
}

export const AddAppUsersForm: React.FC<AddAppUsersFormProps> = ({
  onSubmit,
  onCancel,
  isLoading,
  error,
}) => {
  const [users, setUsers] = useState([{ externalId: "", fullname: "", email: "", phone: "" }]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsers = [...users];
    newUsers[index] = { ...newUsers[index], [e.target.name]: e.target.value };
    setUsers(newUsers);
  };

  const addUser = () => {
    setUsers([...users, { externalId: "", fullname: "", email: "", phone: "" }]);
  };

  const removeUser = (index: number) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: AppUserAddRequestBody = {
      appUsers: users.map(u => ({
        externalId: u.externalId,
        fullname: u.fullname,
        ...(u.email ? { email: u.email } : {}),
        ...(u.phone ? { phone: u.phone } : {}),
      })),
    };
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto px-1 pb-1">
      {error && (
        <div className="p-3 bg-red-50 border border-red-100 text-red-700 rounded-lg text-sm">
          {error.error?.message || "An error occurred while adding the users"}
        </div>
      )}

      {users.map((user, index) => (
        <div key={index} className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-4 relative">
          <div className="flex justify-between items-center pb-2 border-b border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700">User {index + 1}</h4>
            {users.length > 1 && (
              <button 
                type="button" 
                onClick={() => removeUser(index)} 
                className="text-red-500 hover:text-red-700 text-xs font-medium px-2 py-1 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
              >
                Remove
              </button>
            )}
          </div>

          <TextInputField
            label="External ID"
            name="externalId"
            value={user.externalId}
            onChange={(e) => handleChange(index, e)}
            placeholder="e.g. user_12345"
            required
          />

          <TextInputField
            label="Full Name"
            name="fullname"
            value={user.fullname}
            onChange={(e) => handleChange(index, e)}
            placeholder="e.g. John Doe"
            required
          />

          <TextInputField
            label="Email (Optional)"
            name="email"
            type="email"
            value={user.email}
            onChange={(e) => handleChange(index, e)}
            placeholder="e.g. john@example.com"
          />

          <TextInputField
            label="Phone (Optional)"
            name="phone"
            value={user.phone}
            onChange={(e) => handleChange(index, e)}
            placeholder="e.g. +1234567890"
          />
        </div>
      ))}

      <div className="pt-2 pb-4">
        <button 
          type="button" 
          onClick={addUser} 
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add another user
        </button>
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-100 justify-end sticky bottom-0 bg-white items-center py-2">
        <PrimaryOutlinedButton
          type="button"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </PrimaryOutlinedButton>
        <PrimaryButton type="submit" isLoading={isLoading}>
          Add Users
        </PrimaryButton>
      </div>
    </form>
  );
};
