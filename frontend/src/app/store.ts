import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profile/state/profile-slice";
import appsReducer from "../features/apps/state/app-slice";
import channelsReducer from "../features/channels/state/channel-slice";
import appUsersReducer from "../features/app_users/state/app-users-slice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    apps: appsReducer,
    channels: channelsReducer,
    appUsers: appUsersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
