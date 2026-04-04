import React from "react";
import { Outlet } from "react-router-dom";
import AppNavbar from "../navbar/AppNavbar";

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      <AppNavbar />
      <main className="flex-1 overflow-y-auto h-screen relative">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;