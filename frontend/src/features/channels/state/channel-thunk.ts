import { createAsyncThunk } from "@reduxjs/toolkit";
import ChannelApi from "../data/ChannelApi";
import type {
  Channel,
  ChannelList,
  CreateChannelRequestBody,
  UpdateChannelRequestBody,
} from "../data/types";
import {
  mapToNoftifyError,
  type NoftifyError,
} from "../../../util/ErrorHandlerUtil";

export const createChannelThunk = createAsyncThunk<
  Channel,
  { appId: string; data: CreateChannelRequestBody },
  { rejectValue: NoftifyError }
>("channels/createChannel", async ({ appId, data }, { rejectWithValue }) => {
  try {
    return await ChannelApi.createChannel(appId, data);
  } catch (error) {
    return rejectWithValue(mapToNoftifyError(error));
  }
});

export const getAppChannelsThunk = createAsyncThunk<
  ChannelList,
  string,
  { rejectValue: NoftifyError }
>("channels/getAppChannels", async (appId, { rejectWithValue }) => {
  try {
    return await ChannelApi.getChannels(appId);
  } catch (error) {
    return rejectWithValue(mapToNoftifyError(error));
  }
});

export const updateChannelThunk = createAsyncThunk<
  Channel,
  { channelId: string; data: UpdateChannelRequestBody },
  { rejectValue: NoftifyError }
>("channels/updateChannel", async ({ channelId, data }, { rejectWithValue }) => {
  try {
    return await ChannelApi.updateChannel(channelId, data);
  } catch (error) {
    return rejectWithValue(mapToNoftifyError(error));
  }
});

export const deleteChannelThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: NoftifyError }
>("channels/deleteChannel", async (channelId, { rejectWithValue }) => {
  try {
    await ChannelApi.deleteChannel(channelId);
    return channelId;
  } catch (error) {
    return rejectWithValue(mapToNoftifyError(error));
  }
});
