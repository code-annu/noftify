import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { NoftifyError } from "../../../util/ErrorHandlerUtil";
import type { AppUserList } from "../data/types";
import { getAppUsersThunk } from "./app-users-thunk";

export interface AppUsersState {
  appUsers: {
    isLoading: boolean;
    data: AppUserList | null;
    error: NoftifyError | null;
  };
}

const initialState: AppUsersState = {
  appUsers: {
    isLoading: false,
    data: null,
    error: null,
  },
};

const appUsersSlice = createSlice({
  name: "appUsers",
  initialState,
  reducers: {
    setAppUsers: (state, action: PayloadAction<AppUserList | null>) => {
      state.appUsers.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAppUsersThunk.pending, (state) => {
        state.appUsers.isLoading = true;
        state.appUsers.error = null;
      })
      .addCase(getAppUsersThunk.fulfilled, (state, action) => {
        state.appUsers.isLoading = false;
        state.appUsers.data = action.payload;
        state.appUsers.error = null;
      })
      .addCase(getAppUsersThunk.rejected, (state, action) => {
        state.appUsers.isLoading = false;
        state.appUsers.error = action.payload || null;
      });
  },
});

export const { setAppUsers } = appUsersSlice.actions;
export default appUsersSlice.reducer;
