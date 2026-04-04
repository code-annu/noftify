import React, { useState } from "react";
import { AddAppUsersForm } from "./AddAppUsersForm";
import useAppUsersMutations from "../hooks/useAppUsersMutations";
import type { AppUserAddRequestBody } from "../data/types";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../app/app-hook";
import { getAppUsersThunk } from "../state/app-users-thunk";

export const AddAppUserComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { addAppUser, addingUser, addError } = useAppUsersMutations();
  const { id: appId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = async (data: AppUserAddRequestBody) => {
    if (!appId) return;
    const added = await addAppUser(appId, data);
    if (added) {
      handleClose();
      dispatch(getAppUsersThunk(appId));
    }
  };

  return (
    <>
      <div 
        onClick={handleOpen}
        className="group relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200 cursor-pointer min-h-[200px]"
      >
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 text-gray-400 transition-colors mb-3">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.66-1.548c0 .05-.008.1-.024.148M4 19.235A2.999 2.999 0 007 24h10a2.999 2.999 0 002.976-2.585" />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-gray-900 group-hover:text-indigo-700">Add New Users</h3>
        <p className="text-xs text-gray-500 mt-1 text-center">Add new users to your application</p>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
            onClick={handleClose}
          />
          
          {/* Modal */}
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
              <h2 className="text-lg font-bold text-gray-900">Add Application Users</h2>
              <button 
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <AddAppUsersForm 
                onSubmit={handleSubmit}
                onCancel={handleClose}
                isLoading={addingUser}
                error={addError}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
