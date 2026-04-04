import { createBrowserRouter } from "react-router-dom";
import HomePage from "../features/authentication/HomePage";
import AuthCallbackPage from "../features/authentication/AuthCallbackPage";
import SignInWithGooglePage from "../features/authentication/SigninWithGooglePage";
import { CreateProfilePage } from "../features/profile/pages/CreateProfilePage";
import { ProfilePage } from "../features/profile/pages/ProfilePage";
import { ProtectedRoute } from "./ProtectedRoute";
import DashboardLayout from "../components/layouts/DashboardLayout";
import AppsPage from "../features/apps/pages/AppsPage";
import AppLayout from "../components/layouts/AppLayout";
import AppDetailsPage from "../features/apps/pages/AppDetailsPage";
import AppSettingPage from "../features/apps/pages/AppSettingPage";
import ChannelsPage from "../features/channels/pages/ChannelsPage";
import AppUsersPage from "../features/app_users/pages/AppUsersPage";

export enum AppRoutes {
  HOME = "/",
  SIGN_IN_WITH_GOOGLE = "/signin",
  AUTH_CALLBACK = "/auth/callback",
  PROFILE = "/profile",
  PROFILE_CREATE = "/profile/create",
  APPS = "/apps",
  APP_DETAILS = "/apps/:id",
  APP_SETTINGS = "/apps/:id/settings",
  APP_CHANNELS = "/apps/:id/channels",
  APP_USERS = "/apps/:id/users",
}

export const appRouter = createBrowserRouter([
  { path: AppRoutes.SIGN_IN_WITH_GOOGLE, Component: SignInWithGooglePage },
  { path: AppRoutes.AUTH_CALLBACK, Component: AuthCallbackPage },
  { path: AppRoutes.PROFILE_CREATE, Component: CreateProfilePage },
  {
    Component: ProtectedRoute,
    children: [
      {
        Component: DashboardLayout,
        children: [
          { path: AppRoutes.PROFILE, Component: ProfilePage },
          { path: AppRoutes.HOME, Component: HomePage },
          { path: AppRoutes.APPS, Component: AppsPage },
        ],
      },
      {
        Component: AppLayout,
        children: [
          { path: AppRoutes.APP_DETAILS, Component: AppDetailsPage },
          { path: AppRoutes.APP_SETTINGS, Component: AppSettingPage },
          { path: AppRoutes.APP_CHANNELS, Component: ChannelsPage },
          { path: AppRoutes.APP_USERS, Component: AppUsersPage },
        ],
      },
    ],
  },
]);
