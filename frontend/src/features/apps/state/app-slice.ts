import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { NoftifyError } from "../../../util/ErrorHandlerUtil";
import type { App } from "../data/types";
import {
  createAppThunk,
  deleteAppThunk,
  getAppByIdThunk,
  getMyAppsThunk,
  updateAppThunk,
} from "./apps-thunk";

export interface AppState {
  myApps: {
    data: App[] | null;
    error: NoftifyError | null;
    loading: boolean;
  };

  selectedApp: {
    data: App | null;
    error: NoftifyError | null;
    loading: boolean;
  };
}

const initialState: AppState = {
  myApps: {
    loading: false,
    error: null,
    data: null,
  },

  selectedApp: {
    loading: false,
    error: null,
    data: null,
  },
};

const appSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    setMyApps: (state, action: PayloadAction<App[] | null>) => {
      state.myApps.data = action.payload;
      state.myApps.error = null;
    },
    resetState: (state) => {
      state.myApps.data = null;
      state.myApps.error = null;
      state.myApps.loading = false;
      state.selectedApp.data = null;
      state.selectedApp.error = null;
      state.selectedApp.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // getMyAppsThunk
      .addCase(getMyAppsThunk.pending, (state) => {
        state.myApps.loading = true;
        state.myApps.error = null;
      })
      .addCase(getMyAppsThunk.fulfilled, (state, action) => {
        state.myApps.loading = false;
        state.myApps.data = action.payload;
        state.myApps.error = null;
      })
      .addCase(getMyAppsThunk.rejected, (state, action) => {
        state.myApps.loading = false;
        state.myApps.error = action.payload || null;
      })

      // getAppByIdThunk
      .addCase(getAppByIdThunk.pending, (state) => {
        state.selectedApp.loading = true;
        state.selectedApp.error = null;
      })
      .addCase(getAppByIdThunk.fulfilled, (state, action) => {
        state.selectedApp.loading = false;
        state.selectedApp.data = action.payload;
        state.selectedApp.error = null;
      })
      .addCase(getAppByIdThunk.rejected, (state, action) => {
        state.selectedApp.loading = false;
        state.selectedApp.error = action.payload || null;
      })
      // createAppThunk
      .addCase(createAppThunk.fulfilled, (state, action) => {
        if (state.myApps.data) {
          state.myApps.data.push(action.payload);
        } else {
          state.myApps.data = [action.payload];
        }
      })
      // updateAppThunk
      .addCase(updateAppThunk.fulfilled, (state, action) => {
        if (state.myApps.data) {
          const index = state.myApps.data.findIndex(
            (app) => app.id === action.payload.id,
          );
          if (index !== -1) {
            state.myApps.data[index] = action.payload;
          }
        }
      })
      // deleteAppThunk
      .addCase(deleteAppThunk.fulfilled, (state, action) => {
        if (state.myApps.data) {
          state.myApps.data = state.myApps.data.filter(
            (app) => app.id !== action.payload,
          );
        }
      });
  },
});

export const { setMyApps, resetState } = appSlice.actions;
export default appSlice.reducer;
