import type React from "react";
import { useAppDispatch, useAppSelector } from "../app/app-hook";
import { useEffect } from "react";
import { getProfileThunk } from "../features/profile/state/profile-thunk";
import { Outlet, useNavigate } from "react-router-dom";
import { CircularLoadingBar } from "../components/progress/CircularLoadingBar";
import { StorageUtil } from "../util/StorageUtil";
import { AppRoutes } from "./router";
import { ErrorType } from "../util/ErrorHandlerUtil";

export const ProtectedRoute: React.FC = () => {
  const { myProfile } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!StorageUtil.getRefreshToken()) {
      navigate(AppRoutes.SIGN_IN_WITH_GOOGLE);
      return;
    }

    if (!myProfile.data && !myProfile.loading && !myProfile.error) {
      dispatch(getProfileThunk());
    }

    if (myProfile.error) {
      if (myProfile.error.error.type === ErrorType.NOT_FOUND) {
        navigate(AppRoutes.PROFILE_CREATE);
      } else {
        navigate(AppRoutes.SIGN_IN_WITH_GOOGLE);
      }
    }
  }, [myProfile]);

  if (myProfile.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularLoadingBar />
      </div>
    );
  }

  if (myProfile.data) {
    return <Outlet />;
  }

  return <></>;
};
