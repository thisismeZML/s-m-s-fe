import { Book, Layers, PanelRight, ScrollText } from "lucide-react";
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import { useTheme } from "@/theme/ThemeProvider";
import { Theme } from "@/stores/ThemeStore";
import { Home } from "lucide-react";
import SidebarDropdown from "./SidebarDropdown";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/stores/UserStore";
import { decodeToken } from "@/utils/decodeToken";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SuperAdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const { theme } = useTheme();

  const navigate = useNavigate();

  const { user } = useUserStore();
  const decoded = user?.token ? decodeToken(user.token) : null;

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-white dark:bg-black border-r transition-all flex flex-col`}
    >
      {/* Header */}
      <div
        className={`flex items-center px-2 py-4 transition-all duration-300 ${
          collapsed ? "w-20 justify-center" : "w-64 justify-between"
        }`}
      >
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={toggleSidebar}
        >
          {theme === Theme.light ? (
            <img src="/logo.png" alt="Logo" className="w-12" />
          ) : (
            <img src="/darklogo.png" alt="Logo" className="w-12" />
          )}
          {!collapsed && (
            <span
              className={`text-xl font-semibold overflow-hidden transition-all duration-300 whitespace-nowrap ${
                collapsed ? "max-w-0 opacity-0" : "max-w-[150px] opacity-100"
              }`}
            >
              Studify
            </span>
          )}
        </div>

        {/* Only show the collapse button if sidebar is NOT collapsed */}
        {!collapsed && (
          <PanelRight className="cursor-pointer" onClick={toggleSidebar} />
        )}
      </div>

      {/* Nav Items */}
      <nav
        className={`flex flex-col space-y-2 mt-4 transition-all duration-300 ${
          collapsed ? "w-20 items-center justify-center " : "w-64"
        }`}
      >
        <SidebarItem
          icon={<Home size={20} />}
          label="Dashboard"
          collapsed={collapsed}
          href="."
        />
        <SidebarDropdown
          icon={<Layers size={20} />}
          label="Department"
          collapsed={collapsed}
          items={[
            { label: "Department List", href: "department-list" },
            { label: "Create Department", href: "create-department" },
            // { label: "", href: "/permissions" },
          ]}
        />
        <SidebarDropdown
          icon={<Book size={20} />}
          label="Course"
          collapsed={collapsed}
          items={[
            { label: "Course List", href: "course-list" },
            { label: "Create Course", href: "create-course" },
          ]}
        />
        <SidebarDropdown
          icon={<ScrollText size={20} />}
          label="Prerequisite"
          collapsed={collapsed}
          items={[
            { label: "Prerequisite List", href: "prerequisite-list" },
            { label: "Create Prerequisite", href: "create-prerequisite" },
          ]}
        />
      </nav>
      {/* Profile */}
      <div className="mt-auto relative">
        <div className="group relative cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
          <div className="flex items-center gap-2">
            <Avatar className="w-9 h-9">
              <AvatarImage src={decoded?.profile || ""} alt={decoded?.name || "User"} />
              <AvatarFallback>
                {decoded?.name
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase() || "SA"}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="text-sm">
                <p className="font-medium">{decoded?.name || "User"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {decoded?.email || "user@email.com"}
                </p>
              </div>
            )}
          </div>

          {/* Dropdown */}
          <div className="absolute bottom-12 left-0 w-48 bg-white dark:bg-neutral-900 shadow-xl border dark:border-neutral-800 rounded-lg z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200">
            <a
              href="/settings"
              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              Settings
            </a>
            <button
              onClick={() => {
                Cookies.remove("accessToken");
                navigate("/login");
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SuperAdminSidebar;
