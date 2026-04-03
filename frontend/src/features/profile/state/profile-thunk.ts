import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProfileApi } from "../data/ProfileApi";
import type {
  Profile,
  ProfileCreateRequestBody,
  ProfileUpdateRequestBody,
} from "../data/types";
import {
  mapToNoftifyError,
  type NoftifyError,
} from "../../../util/ErrorHandlerUtil";

export const createProfileThunk = createAsyncThunk<
  Profile,
  ProfileCreateRequestBody,
  { rejectValue: NoftifyError }
>("profile/createProfile", async (data, { rejectWithValue }) => {
  try {
    return await ProfileApi.createProfile(data);
  } catch (error) {
    return rejectWithValue(mapToNoftifyError(error));
  }
});

export const getProfileThunk = createAsyncThunk<
  Profile,
  void,
  { rejectValue: NoftifyError }
>("profile/getProfile", async (_, { rejectWithValue }) => {
  try {
    return await ProfileApi.getProfile();
  } catch (error) {
    return rejectWithValue(mapToNoftifyError(error));
  }
});

export const updateProfileThunk = createAsyncThunk<
  Profile,
  ProfileUpdateRequestBody,
  { rejectValue: NoftifyError }
>("profile/updateProfile", async (data, { rejectWithValue }) => {
  try {
    return await ProfileApi.updateProfile(data);
  } catch (error) {
    return rejectWithValue(mapToNoftifyError(error));
  }
});

export const deleteProfileThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: NoftifyError }
>("profile/deleteProfile", async (_, { rejectWithValue }) => {
  try {
    await ProfileApi.deleteProfile();
  } catch (error) {
    return rejectWithValue(mapToNoftifyError(error));
  }
});
