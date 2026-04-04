import { useState } from "react";
import { useAppDispatch } from "../../../app/app-hook";
import type { CreateChannelRequestBody, UpdateChannelRequestBody } from "../data/types";
import {
  createChannelThunk,
  deleteChannelThunk,
  updateChannelThunk,
} from "../state/channel-thunk";
import { toast } from "react-toastify";
import { type NoftifyError } from "../../../util/ErrorHandlerUtil";

export default function useChannelsMutations() {
  const dispatch = useAppDispatch();

  const [creatingChannel, setCreatingChannel] = useState(false);
  const [createError, setCreateError] = useState<NoftifyError | null>(null);

  const [updatingChannel, setUpdatingChannel] = useState(false);
  const [updateError, setUpdateError] = useState<NoftifyError | null>(null);

  const [deletingChannel, setDeletingChannel] = useState(false);
  const [deleteError, setDeleteError] = useState<NoftifyError | null>(null);

  const createChannel = async (appId: string, input: CreateChannelRequestBody) => {
    let created: boolean = false;
    try {
      setCreateError(null);
      setCreatingChannel(true);
      await dispatch(createChannelThunk({ appId, data: input })).unwrap();
      toast.success("Channel created successfully");
      created = true;
    } catch (err) {
      setCreateError(err as NoftifyError);
      toast.error("Failed to create channel");
    } finally {
      setCreatingChannel(false);
    }
    return created;
  };

  const updateChannel = async (channelId: string, input: UpdateChannelRequestBody) => {
    let updated: boolean = false;
    try {
      setUpdateError(null);
      setUpdatingChannel(true);
      await dispatch(updateChannelThunk({ channelId, data: input })).unwrap();
      toast.success("Channel updated successfully");
      updated = true;
    } catch (err) {
      setUpdateError(err as NoftifyError);
      toast.error("Failed to update channel");
    } finally {
      setUpdatingChannel(false);
    }
    return updated;
  };

  const deleteChannel = async (channelId: string) => {
    let deleted: boolean = false;
    try {
      setDeleteError(null);
      setDeletingChannel(true);
      await dispatch(deleteChannelThunk(channelId)).unwrap();
      toast.success("Channel deleted successfully");
      deleted = true;
    } catch (err) {
      setDeleteError(err as NoftifyError);
      toast.error("Failed to delete channel");
    } finally {
      setDeletingChannel(false);
    }
    return deleted;
  };

  return {
    createChannel,
    creatingChannel,
    createError,
    updateChannel,
    updatingChannel,
    updateError,
    deleteChannel,
    deletingChannel,
    deleteError,
  };
}
