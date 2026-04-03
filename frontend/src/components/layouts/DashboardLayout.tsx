import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "../navbar/SideNavbar";

const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      <SideNavbar />
      <main className="flex-1 overflow-y-auto h-screen relative">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
