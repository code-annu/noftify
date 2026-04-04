import { useState } from "react";
import { useAppDispatch } from "../../../app/app-hook";
import type { AppCreateRequestBody, AppUpdateRequestBody } from "../data/types";
import {
  createAppThunk,
  deleteAppThunk,
  updateAppThunk,
} from "../state/apps-thunk";
import { toast } from "react-toastify";
import { type NoftifyError } from "../../../util/ErrorHandlerUtil";
import ApiKeyUtil from "../../../util/ApiKeyUtil";

export default function useAppMutations() {
  const dispatch = useAppDispatch();

  const [creatingApp, setCreatingApp] = useState(false);
  const [createError, setCreateError] = useState<NoftifyError | null>(null);

  const [updatingApp, setUpdatingApp] = useState(false);
  const [updateError, setUpdateError] = useState<NoftifyError | null>(null);

  const [deletingApp, setDeletingApp] = useState(false);
  const [deleteError, setDeleteError] = useState<NoftifyError | null>(null);

  const createApp = async (input: AppCreateRequestBody) => {
    let created: boolean = false;
    try {
      setCreateError(null);
      setCreatingApp(true);
      const createdApp = await dispatch(createAppThunk(input)).unwrap();
      toast.success("App created successfully");
      ApiKeyUtil.saveApiKey(createdApp.id, createdApp.apiKey!);
      created = true;
    } catch (err) {
      setCreateError(err as NoftifyError);
      toast.error("Failed to create app");
    } finally {
      setCreatingApp(false);
    }
    return created;
  };

  const updateApp = async (id: string, input: AppUpdateRequestBody) => {
    let updated: boolean = false;
    try {
      setUpdateError(null);
      setUpdatingApp(true);
      await dispatch(updateAppThunk({ id, data: input })).unwrap();
      toast.success("App updated successfully");
      updated = true;
    } catch (err) {
      setUpdateError(err as NoftifyError);
      toast.error("Failed to update app");
    } finally {
      setUpdatingApp(false);
    }
    return updated;
  };

  const deleteApp = async (id: string) => {
    let deleted: boolean = false;
    try {
      setDeleteError(null);
      setDeletingApp(true);
      await dispatch(deleteAppThunk(id)).unwrap();
      toast.success("App deleted successfully");
      deleted = true;
    } catch (err) {
      setDeleteError(err as NoftifyError);
      toast.error("Failed to delete app");
    } finally {
      setDeletingApp(false);
    }
    return deleted;
  };

  return {
    createApp,
    creatingApp,
    createError,
    updateApp,
    updatingApp,
    updateError,
    deleteApp,
    deletingApp,
    deleteError,
  };
}
