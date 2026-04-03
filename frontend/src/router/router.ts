import { createBrowserRouter } from "react-router-dom";
import HomePage from "../features/authentication/HomePage";
import AuthCallbackPage from "../features/authentication/AuthCallbackPage";
import SignInWithGooglePage from "../features/authentication/SigninWithGooglePage";
import { CreateProfilePage } from "../features/profile/pages/CreateProfilePage";
import { ProfilePage } from "../features/profile/pages/ProfilePage";
import { ProtectedRoute } from "./ProtectedRoute";
import DashboardLayout from "../components/layouts/DashboardLayout";
import AppsPage from "../features/apps/AppsPage";

export enum AppRoutes {
  HOME = "/",
  SIGN_IN_WITH_GOOGLE = "/signin",
  AUTH_CALLBACK = "/auth/callback",
  PROFILE = "/profile",
  PROFILE_CREATE = "/profile/create",
  APPS = "/apps",
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
    ],
  },
]);
