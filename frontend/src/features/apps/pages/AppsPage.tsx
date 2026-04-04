import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { getMyAppsThunk } from "../state/apps-thunk";
import { CreateAppComponent } from "../components/CreateAppComponent";
import { AppComponent } from "../components/AppComponent";
import { CircularLoadingBar } from "../../../components/progress/CircularLoadingBar";

const AppsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: apps, loading, error } = useAppSelector((state) => state.apps.myApps);

  useEffect(() => {
    dispatch(getMyAppsThunk());
  }, [dispatch]);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Applications</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage your integrations and API keys.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm font-medium">
          {error.error?.message || "Failed to load applications"}
        </div>
      )}

      {loading && !apps ? (
        <div className="flex justify-center py-20">
          <CircularLoadingBar />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CreateAppComponent />
          
          {apps?.map((app: any) => (
            <AppComponent key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppsPage;
