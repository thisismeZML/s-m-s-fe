import { Link } from "react-router-dom";
import {
  Tooltip,
  // TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
  collapsed: boolean;
};

const SidebarItem = ({ icon, label, href, collapsed }: SidebarItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={href}
            className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div>{icon}</div>
            {!collapsed && (
              <span
                className={`overflow-hidden  whitespace-nowrap ${
                  collapsed ? "max-w-0 opacity-0" : "max-w-[160px] opacity-100"
                }`}
              >
                {label}
              </span>
            )}
          </Link>
        </TooltipTrigger>
        {/* {collapsed && (
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        )} */}
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarItem;
