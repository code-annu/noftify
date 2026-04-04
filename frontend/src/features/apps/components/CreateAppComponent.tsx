import React, { useState } from "react";
import { CreateAppForm } from "./CreateAppForm";
import useAppMutations from "../hooks/useAppMutations";
import type { AppCreateRequestBody } from "../data/types";

export const CreateAppComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { createApp, creatingApp, createError } = useAppMutations();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSubmit = async (data: AppCreateRequestBody) => {
    const created = await createApp(data);
    if (created) {
      handleClose();
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-gray-900 group-hover:text-indigo-700">Create New App</h3>
        <p className="text-xs text-gray-500 mt-1 text-center">Set up a new application integration</p>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
            onClick={handleClose}
          />
          
          {/* Modal */}
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-bold text-gray-900">Create Application</h2>
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
              <CreateAppForm 
                onSubmit={handleSubmit}
                onCancel={handleClose}
                isLoading={creatingApp}
                error={createError}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
