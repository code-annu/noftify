import { useState } from "react";
import { useAppDispatch } from "../../../app/app-hook";
import type { AppUserAddRequestBody, AppUserUpdateRequestBody } from "../data/types";
import {
  addAppUsersThunk,
  updateAppUserThunk,
  deleteAppUserThunk,
  deleteAppUsersThunk,
} from "../state/app-users-thunk";
import { toast } from "react-toastify";
import { type NoftifyError } from "../../../util/ErrorHandlerUtil";

export default function useAppUsersMutations() {
  const dispatch = useAppDispatch();

  const [addingUser, setAddingUser] = useState(false);
  const [addError, setAddError] = useState<NoftifyError | null>(null);

  const [updatingUser, setUpdatingUser] = useState(false);
  const [updateError, setUpdateError] = useState<NoftifyError | null>(null);

  const [deletingUser, setDeletingUser] = useState(false);
  const [deleteError, setDeleteError] = useState<NoftifyError | null>(null);

  const [deletingUsers, setDeletingUsers] = useState(false);
  const [deleteUsersError, setDeleteUsersError] = useState<NoftifyError | null>(null);

  const addAppUser = async (appId: string, input: AppUserAddRequestBody) => {
    let added = false;
    try {
      setAddError(null);
      setAddingUser(true);
      await dispatch(addAppUsersThunk({ appId, data: input })).unwrap();
      toast.success("App user added successfully");
      added = true;
    } catch (err) {
      setAddError(err as NoftifyError);
      toast.error("Failed to add app user");
    } finally {
      setAddingUser(false);
    }
    return added;
  };

  const updateAppUser = async (userId: string, input: AppUserUpdateRequestBody) => {
    let updated = false;
    try {
      setUpdateError(null);
      setUpdatingUser(true);
      await dispatch(updateAppUserThunk({ userId, data: input })).unwrap();
      toast.success("App user updated successfully");
      updated = true;
    } catch (err) {
      setUpdateError(err as NoftifyError);
      toast.error("Failed to update app user");
    } finally {
      setUpdatingUser(false);
    }
    return updated;
  };

  const deleteAppUser = async (userId: string) => {
    let deleted = false;
    try {
      setDeleteError(null);
      setDeletingUser(true);
      await dispatch(deleteAppUserThunk(userId)).unwrap();
      toast.success("App user deleted successfully");
      deleted = true;
    } catch (err) {
      setDeleteError(err as NoftifyError);
      toast.error("Failed to delete app user");
    } finally {
      setDeletingUser(false);
    }
    return deleted;
  };

  const deleteAppUsers = async (appId: string) => {
    let deleted = false;
    try {
      setDeleteUsersError(null);
      setDeletingUsers(true);
      await dispatch(deleteAppUsersThunk(appId)).unwrap();
      toast.success("All app users deleted successfully");
      deleted = true;
    } catch (err) {
      setDeleteUsersError(err as NoftifyError);
      toast.error("Failed to delete all app users");
    } finally {
      setDeletingUsers(false);
    }
    return deleted;
  };

  return {
    addAppUser,
    addingUser,
    addError,
    updateAppUser,
    updatingUser,
    updateError,
    deleteAppUser,
    deletingUser,
    deleteError,
    deleteAppUsers,
    deletingUsers,
    deleteUsersError,
  };
}
