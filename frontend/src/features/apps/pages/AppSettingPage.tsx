import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { getAppByIdThunk } from "../state/apps-thunk";
import { CircularLoadingBar } from "../../../components/progress/CircularLoadingBar";
import { TextInputField } from "../../../components/inputs/TextInputField";
import { PrimaryButton } from "../../../components/buttons/PrimaryButton";
import { DangerButton } from "../../../components/buttons/DangerButton";
import useAppMutations from "../hooks/useAppMutations";
import { AppRoutes } from "../../../router/router";

const AppSettingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: app, loading, error } = useAppSelector((state) => state.apps.selectedApp);
  
  const { updateApp, updatingApp, deleteApp, deletingApp, updateError } = useAppMutations();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  });

  useEffect(() => {
    if (id && (!app || app.id !== id)) {
      dispatch(getAppByIdThunk(id));
    }
  }, [dispatch, id, app]);

  useEffect(() => {
    if (app) {
      setFormData({
        name: app.name,
        description: app.description || "",
        isActive: app.isActive,
      });
    }
  }, [app]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Handle checkbox separately if needed, but not used here as typical checkbox isn't TextInputField
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updateApp(id, formData);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${app?.name}? This action cannot be undone.`)) {
      if (id) {
        const deleted = await deleteApp(id);
        if (deleted) {
          navigate(AppRoutes.APPS);
        }
      }
    }
  };

  if (loading && !app) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <CircularLoadingBar />
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-100 text-red-700 p-6 rounded-2xl">
          <h2 className="text-lg font-bold">App not found</h2>
          <p className="mt-1">The application you are looking for could not be found or you don't have access.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">App Settings</h1>
        <p className="text-gray-500 mt-1 text-sm">Manage configuration and danger zone for this app.</p>
      </div>

      {updateError && (
        <div className="p-4 mb-6 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm font-medium">
          {updateError.error?.message || "Failed to update application"}
        </div>
      )}

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-6">General Information</h2>
        
        <form onSubmit={handleUpdate} className="space-y-6 max-w-2xl">
          <TextInputField
            label="App Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="block text-sm font-semibold text-gray-700 outline-none">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 text-gray-900 outline-none resize-none"
            />
          </div>

          <div className="pt-4 border-t border-gray-100">
            <PrimaryButton type="submit" isLoading={updatingApp} className="w-full sm:w-auto px-8">
              Save Changes
            </PrimaryButton>
          </div>
        </form>
      </div>

      <div className="bg-red-50/50 rounded-3xl p-8 border border-red-100">
        <h2 className="text-lg font-bold text-red-900 mb-2">Danger Zone</h2>
        <p className="text-sm text-red-700/80 mb-6 max-w-2xl">
          Deleting this application will permanently remove all associated data, channels, and API keys. This action cannot be undone.
        </p>
        
        <DangerButton onClick={handleDelete} isLoading={deletingApp}>
          Delete Application
        </DangerButton>
      </div>
    </div>
  );
};

export default AppSettingPage;
