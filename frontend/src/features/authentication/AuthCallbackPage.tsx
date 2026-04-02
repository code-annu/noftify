import { useEffect } from "react";
import { supabase } from "../../config/supbase.client";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../router/router";
import { CircularLoadingBar } from "../../components/progress/CircularLoadingBar";
import { useAppDispatch } from "../../app/app-hook";
import { getProfileThunk } from "../profile/state/profile-thunk";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        navigate(AppRoutes.SIGN_IN_WITH_GOOGLE);
        return;
      }

      if (data.session) {
        // Fetch profile to verify if user has already created one
        try {
          const resultAction = await dispatch(getProfileThunk());
          if (getProfileThunk.fulfilled.match(resultAction)) {
            // Profile exists, go to profile page or home
            navigate(AppRoutes.PROFILE);
          } else {
            // Error occurred, likely a 404 meaning profile doesn't exist yet
            navigate(AppRoutes.PROFILE_CREATE);
          }
        } catch (e) {
          navigate(AppRoutes.PROFILE_CREATE);
        }
      }
    };

    getSession();
  }, [dispatch, navigate]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <CircularLoadingBar />
    </div>
  );
};

export default AuthCallbackPage;
