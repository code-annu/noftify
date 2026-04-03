import { useState } from "react";
import { useAppDispatch } from "../../../app/app-hook";
import type { ProfileCreateRequestBody } from "../data/types";
import {
  createProfileThunk,
  deleteProfileThunk,
  updateProfileThunk,
} from "../state/profile-thunk";
import { toast } from "react-toastify";
import { setProfile } from "../state/profile-slice";
import {
  mapToNoftifyError,
  type NoftifyError,
} from "../../../util/ErrorHandlerUtil";

export default function useProfileMutation() {
  const dispatch = useAppDispatch();

  const [creatingProfile, setCreatingProfile] = useState(false);
  const [createError, setCreateError] = useState<NoftifyError | null>(null);

  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [updateError, setUpdateError] = useState<NoftifyError | null>(null);

  const [deletingProfile, setDeletingProfile] = useState(false);
  const [deleteError, setDeleteError] = useState<NoftifyError | null>(null);

  const createProfile = async (input: ProfileCreateRequestBody) => {
    let created: boolean = false;
    try {
      setCreateError(null);
      setCreatingProfile(true);
      const profileCreated = await dispatch(createProfileThunk(input)).unwrap();
      toast.success("Profile created successfully");
      dispatch(setProfile(profileCreated));
      created = true;
    } catch (err) {
      setCreateError(err as NoftifyError);
    } finally {
      setCreatingProfile(false);
    }
    return created;
  };

  const updateProfile = async (input: ProfileCreateRequestBody) => {
    let updated: boolean = false;
    try {
      setUpdateError(null);
      setUpdatingProfile(true);
      const profileUpdated = await dispatch(updateProfileThunk(input)).unwrap();
      toast.success("Profile updated successfully");
      dispatch(setProfile(profileUpdated));
      updated = true;
    } catch (err) {
      setUpdateError(mapToNoftifyError(err));
      toast.error("Failed to update profile");
    } finally {
      setUpdatingProfile(false);
    }
    return updated;
  };

  const deleteProfile = async () => {
    let deleted: boolean = false;
    try {
      setDeleteError(null);
      setDeletingProfile(true);
      await dispatch(deleteProfileThunk()).unwrap();
      toast.success("Profile deleted successfully");
      dispatch(setProfile(null));
      deleted = true;
    } catch (err) {
      setDeleteError(mapToNoftifyError(err));
      toast.error("Failed to delete profile");
    } finally {
      setDeletingProfile(false);
    }
    return deleted;
  };

  return {
    createProfile,
    creatingProfile,
    createError,
    updateProfile,
    updatingProfile,
    updateError,
    deleteProfile,
    deletingProfile,
    deleteError,
  };
}
