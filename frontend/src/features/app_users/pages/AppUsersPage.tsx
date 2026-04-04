import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { getAppUsersThunk } from "../state/app-users-thunk";
import { AddAppUserComponent } from "../components/AddAppUserComponent";
import { AppUserComponent } from "../components/AppUserComponent";
import { CircularLoadingBar } from "../../../components/progress/CircularLoadingBar";
import { useParams } from "react-router-dom";
import useAppUsersMutations from "../hooks/useAppUsersMutations";
import { DangerButton } from "../../../components/buttons/DangerButton";

const AppUsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: usersData, isLoading: loading, error } = useAppSelector((state) => state.appUsers.appUsers);
  const { id: appId } = useParams<{ id: string }>();
  const { deleteAppUsers, deletingUsers } = useAppUsersMutations();

  useEffect(() => {
    if (appId) {
      dispatch(getAppUsersThunk(appId));
    }
  }, [dispatch, appId]);

  const handleDeleteAll = async () => {
    if (appId && window.confirm("Are you sure you want to delete all users?")) {
      const deleted = await deleteAppUsers(appId);
      if (deleted) {
        dispatch(getAppUsersThunk(appId));
      }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 gap-4 sm:gap-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">App Users</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage the users of your application.</p>
        </div>
        {usersData?.appUsers && usersData.appUsers.length > 0 && (
          <DangerButton onClick={handleDeleteAll} isLoading={deletingUsers}>
            Delete All Users
          </DangerButton>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm font-medium">
          {error.error?.message || "Failed to load applications"}
        </div>
      )}

      {loading && !usersData ? (
        <div className="flex justify-center py-20">
          <CircularLoadingBar />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AddAppUserComponent />
          
          {usersData?.appUsers?.map((user) => (
            <AppUserComponent key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppUsersPage;
