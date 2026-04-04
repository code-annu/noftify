import React from "react";
import { useNavigate } from "react-router-dom";
import type { App } from "../data/types";
import { AppRoutes } from "../../../router/router";

interface AppComponentProps {
  app: App;
}

export const AppComponent: React.FC<AppComponentProps> = ({ app }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(AppRoutes.APP_DETAILS.replace(":id", app.id));
  };

  return (
    <div 
      onClick={handleNavigate}
      className="relative flex flex-col p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          {app.name.charAt(0).toUpperCase()}
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${app.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
          {app.isActive ? 'Active' : 'Inactive'}
        </div>
      </div>
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">{app.name}</h3>
      <p className="text-gray-500 text-sm mt-1 line-clamp-2">{app.description || "No description provided."}</p>
      
      <div className="mt-auto pt-6 flex justify-between items-center">
        <span className="text-xs font-medium text-gray-400">
          {new Date(app.createdAt).toLocaleDateString()}
        </span>
        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold transition-colors flex items-center gap-1">
          Manage
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};
