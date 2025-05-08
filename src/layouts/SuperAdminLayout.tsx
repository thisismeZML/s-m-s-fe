import Header from "@/features/superadmin/components/Header";
import SuperAdminSidebar from "@/features/superadmin/components/SuperAdminSidebar";
import { Outlet } from "react-router-dom";

const SuperAdminLayout = () => {
  return (
    <div className="min-h-screen overflow-hidden flex">
      <SuperAdminSidebar />
      <div className="flex flex-col w-full">
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
