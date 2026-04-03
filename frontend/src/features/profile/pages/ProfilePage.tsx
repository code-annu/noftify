import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { getProfileThunk } from "../state/profile-thunk";
import { ProfileViewComponent } from "../components/ProfileViewComponent";
import { ProfileUpdateComponent } from "../components/ProfileUpdateComponent";
import { CircularLoadingBar } from "../../../components/progress/CircularLoadingBar";
import { DangerButton } from "../../../components/buttons/DangerButton";
import useProfileMutation from "../hooks/useProfileMutations";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../router/router";

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: profile, loading, error } = useAppSelector((state) => state.profile.myProfile);
  const [isEditing, setIsEditing] = useState(false);
  
  const { deleteProfile, deletingProfile } = useProfileMutation();

  useEffect(() => {
    if (!profile && !loading && !error) {
      dispatch(getProfileThunk());
    }
  }, [dispatch, profile, loading, error]);

  const handleDeleteProfile = async () => {
    if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      const deleted = await deleteProfile();
      if (deleted) {
        navigate(AppRoutes.PROFILE_CREATE);
      }
    }
  };

  if (loading && !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <CircularLoadingBar />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="p-8 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
          <p className="text-lg font-medium">Profile not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex justify-center flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {isEditing ? (
          <ProfileUpdateComponent 
            profile={profile} 
            onCancel={() => setIsEditing(false)} 
            onSave={() => setIsEditing(false)} 
          />
        ) : (
          <ProfileViewComponent 
            profile={profile} 
            onEdit={() => setIsEditing(true)} 
          />
        )}
      </div>

      <div className="w-full max-w-3xl mt-6 flex justify-end">
        <DangerButton 
          onClick={handleDeleteProfile} 
          isLoading={deletingProfile}
          className="w-full sm:w-auto"
        >
          <svg className="w-5 h-5 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete Profile
        </DangerButton>
      </div>
    </div>
  );
};
