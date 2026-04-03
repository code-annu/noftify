import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { NoftifyError } from "../../../util/ErrorHandlerUtil";
import type { Profile } from "../data/types";
import { getProfileThunk, createProfileThunk, updateProfileThunk } from "./profile-thunk";

export interface ProfileState {
  myProfile: {
    loading: boolean;
    error: NoftifyError | null;
    data: Profile | null;
  };
}

const initialState: ProfileState = {
  myProfile: {
    loading: false,
    error: null,
    data: null,
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile|null>) => {
      state.myProfile.data = action.payload;
      state.myProfile.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handling getProfile thunk
    builder
      .addCase(getProfileThunk.pending, (state) => {
        state.myProfile.loading = true;
        state.myProfile.error = null;
      })
      .addCase(getProfileThunk.fulfilled, (state, action) => {
        state.myProfile.loading = false;
        state.myProfile.data = action.payload;
        state.myProfile.error = null;
      })
      .addCase(getProfileThunk.rejected, (state, action) => {
        state.myProfile.loading = false;
        state.myProfile.error = action.payload || null;
      })
      // Handling createProfile thunk
      .addCase(createProfileThunk.fulfilled, (state, action) => {
        state.myProfile.data = action.payload;
        state.myProfile.error = null;
      })
      // Handling updateProfile thunk
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.myProfile.data = { ...state.myProfile.data, ...action.payload };
        }
        state.myProfile.error = null;
      });
  },
});

export const {setProfile} = profileSlice.actions;
export default profileSlice.reducer;
