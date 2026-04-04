import React from "react";
import type { AppUser } from "../data/types";
import { format } from "date-fns";
import useAppUsersMutations from "../hooks/useAppUsersMutations";
import { useAppDispatch } from "../../../app/app-hook";
import { getAppUsersThunk } from "../state/app-users-thunk";

interface AppUserComponentProps {
  user: AppUser;
}

export const AppUserComponent: React.FC<AppUserComponentProps> = ({ user }) => {
  const { deleteAppUser, deletingUser } = useAppUsersMutations();
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const deleted = await deleteAppUser(user.id);
      if (deleted) {
        dispatch(getAppUsersThunk(user.app.id));
      }
    }
  };

  return (
    <div className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
          {user.fullname.charAt(0).toUpperCase()}
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              user.isActive
                ? "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20"
                : "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
            }`}
          >
            {user.isActive ? "Active" : "Inactive"}
          </span>
          <button 
            onClick={handleDelete}
            disabled={deletingUser}
            className="text-gray-400 hover:text-red-600 transition-colors p-1"
            title="Delete User"
          >
            {deletingUser ? (
              <svg className="animate-spin h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            ) : (
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
        {user.fullname}
      </h3>
      <p className="text-sm font-medium text-gray-400 mb-4 inline-flex items-center gap-1.5 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100/50">
        ID: <code className="text-gray-600 font-mono text-xs">{user.externalId}</code>
      </p>

      <div className="space-y-2 mt-4 text-sm text-gray-600">
        {user.email && (
          <div className="flex items-center gap-2">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span className="truncate">{user.email}</span>
          </div>
        )}
        {user.phone && (
          <div className="flex items-center gap-2">
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.289-4.042-6.84-7.042l1.293-.97c.362-.271.527-.735.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <span>{user.phone}</span>
          </div>
        )}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-50">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs text-gray-400">
            Added on {format(new Date(user.createdAt), "MMM d, yyyy")}
          </span>
        </div>
      </div>
    </div>
  );
};
