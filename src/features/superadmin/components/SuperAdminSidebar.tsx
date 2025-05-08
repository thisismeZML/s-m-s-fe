import { Folder, Layers, PanelRight } from "lucide-react";
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import { useTheme } from "@/theme/ThemeProvider";
import { Theme } from "@/stores/ThemeStore";
import { Home, Settings } from "lucide-react";
import SidebarDropdown from "./SidebarDropdown";

const SuperAdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const { theme } = useTheme();

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
        <SidebarItem
          icon={<Settings size={20} />}
          label="Settings"
          collapsed={collapsed}
          href="/settings"
        />
      </nav>
    </aside>
  );
};

export default SuperAdminSidebar;
