import { createAsyncThunk } from "@reduxjs/toolkit";
import AppUserApi from "../data/AppUsersApi";
import type {
  AppUser,
  AppUserList,
  AppUserAddRequestBody,
  AppUserUpdateRequestBody,
} from "../data/types";
import {
  mapToNoftifyError,
  type NoftifyError,
} from "../../../util/ErrorHandlerUtil";

class AppUserApiImpl extends AppUserApi {}
const api = new AppUserApiImpl();

export const addAppUsersThunk = createAsyncThunk<
  AppUserList,
  { appId: string; data: AppUserAddRequestBody },
  { rejectValue: NoftifyError }
>("appUsers/addAppUsers", async ({ appId, data }, { rejectWithValue }) => {
  try {
    return await api.addAppUsers(appId, data);
  } catch (error) {
    return rejectWithValue(mapToNoftifyError(error));
  }
});

export const getAppUsersThunk = createAsyncThunk<
  AppUserList,
  string,
  { rejectValue: NoftifyError }
>("appUsers/getAppUsers", async (appId, { rejectWithValue }) => {
  try {
    return await api.getAppUsers(appId);
  } catch (error) {
    return rejectWithValue(mapToNoftifyError(error));
  }
});

export const getAppUserThunk = createAsyncThunk<
  AppUser,
  string,
  { rejectValue: NoftifyError }
>("appUsers/getAppUser", async (userId, { rejectWithValue }) => {
  try {
    return await api.getAppUser(userId);
  } catch (error) {
    return rejectWithValue(mapToNoftifyError(error));
  }
});

export const updateAppUserThunk = createAsyncThunk<
  AppUser,
  { userId: string; data: AppUserUpdateRequestBody },
  { rejectValue: NoftifyError }
>("appUsers/updateAppUser", async ({ userId, data }, { rejectWithValue }) => {
  try {
    return await api.updateAppUser(userId, data);
  } catch (error) {
    return rejectWithValue(mapToNoftifyError(error));
  }
});

export const deleteAppUserThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: NoftifyError }
>("appUsers/deleteAppUser", async (userId, { rejectWithValue }) => {
  try {
    await api.deleteAppUser(userId);
    return userId;
  } catch (error) {
    return rejectWithValue(mapToNoftifyError(error));
  }
});

export const deleteAppUsersThunk = createAsyncThunk<
  string,
  string, // appId
  { rejectValue: NoftifyError }
>("appUsers/deleteAppUsers", async (appId, { rejectWithValue }) => {
  try {
    await api.deleteAppUsers(appId);
    return appId;
  } catch (error) {
    return rejectWithValue(mapToNoftifyError(error));
  }
});
