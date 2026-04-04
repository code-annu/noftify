import { createAsyncThunk } from "@reduxjs/toolkit";
import AppApi from "../data/AppApi";
import type {
  App,
  AppCreateRequestBody,
  AppUpdateRequestBody,
} from "../data/types";
import {
  mapToNoftifyError,
  type NoftifyError,
} from "../../../util/ErrorHandlerUtil";

export const createAppThunk = createAsyncThunk<
  App,
  AppCreateRequestBody,
  { rejectValue: NoftifyError }
>("apps/createApp", async (data, { rejectWithValue }) => {
  try {
    return await AppApi.create(data);
  } catch (error) {
    return rejectWithValue(mapToNoftifyError(error));
  }
});

export const getMyAppsThunk = createAsyncThunk<
  App[],
  void,
  { rejectValue: NoftifyError }
>("apps/getMyApps", async (_, { rejectWithValue }) => {
  try {
    return await AppApi.getAll();
  } catch (error) {
    return rejectWithValue(mapToNoftifyError(error));
  }
});

export const getAppByIdThunk = createAsyncThunk<
  App,
  string,
  { rejectValue: NoftifyError }
>("apps/getAppById", async (id, { rejectWithValue }) => {
  try {
    return await AppApi.getById(id);
  } catch (error) {
    return rejectWithValue(mapToNoftifyError(error));
  }
});

export const updateAppThunk = createAsyncThunk<
  App,
  { id: string; data: AppUpdateRequestBody },
  { rejectValue: NoftifyError }
>("apps/updateApp", async ({ id, data }, { rejectWithValue }) => {
  try {
    return await AppApi.update(id, data);
  } catch (error) {
    return rejectWithValue(mapToNoftifyError(error));
  }
});

export const deleteAppThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: NoftifyError }
>("apps/deleteApp", async (id, { rejectWithValue }) => {
  try {
    await AppApi.delete(id);
    return id;
  } catch (error) {
    return rejectWithValue(mapToNoftifyError(error));
  }
});
