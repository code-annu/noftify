import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/app-hook";
import { getAppByIdThunk } from "../state/apps-thunk";
import { CircularLoadingBar } from "../../../components/progress/CircularLoadingBar";
import ApiKeyUtil from "../../../util/ApiKeyUtil";

const AppDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const {
    data: app,
    loading,
    error,
  } = useAppSelector((state) => state.apps.selectedApp);

  useEffect(() => {
    if (id) {
      dispatch(getAppByIdThunk(id));
    }
  }, [dispatch, id]);

  if (loading && !app) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <CircularLoadingBar />
      </div>
    );
  }

  if (error || !app) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-100 text-red-700 p-6 rounded-2xl">
          <h2 className="text-lg font-bold">App not found</h2>
          <p className="mt-1">
            The application you are looking for could not be found or you don't
            have access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-60 -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-200">
              {app.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {app.name}
              </h1>
              <div className="flex items-center gap-3 mt-2">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold ${app.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                >
                  {app.isActive ? "Active" : "Inactive"}
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  Created {new Date(app.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">
              Background Information
            </h3>
            <p className="text-gray-600 leading-relaxed max-w-3xl">
              {app.description ||
                "No description provided for this application. You can add one in the settings to help your team understand its purpose."}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            API Integration
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Use this token to authenticate your API requests.
          </p>
          <div className="p-4 bg-gray-50 rounded-xl font-mono text-sm break-all text-gray-700 border border-gray-200">
            {ApiKeyUtil.getApiKey(app.id) ||
              "API Key hidden. Please re-generate if lost."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetailsPage;
