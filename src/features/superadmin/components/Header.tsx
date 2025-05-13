import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ArrowLeftFromLine, ChevronDown, CircleUserRound } from "lucide-react";

import Header from "@/features/auth/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import useUserStore from "@/stores/UserStore";
import { decodeToken } from "@/utils/decodeToken";

const HeaderDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/login");
  };

  const { user } = useUserStore();

  const decoded = user?.token ? decodeToken(user?.token) : null;

  const getInitials = (name: string | undefined) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-[68px] bg-white dark:bg-[#09090B] dark:text-white flex items-center justify-end gap-4 w-full shadow-sm px-6 relative">
      <Header />
      <Separator orientation="vertical" />
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={handleToggle}
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 px-2 py-1 rounded-md transition-colors"
        >
          <Avatar className="w-9 h-9">
            {decoded?.profile ? (
              <AvatarImage src={decoded.profile} alt={decoded.name} />
            ) : (
              <AvatarFallback>{getInitials(decoded?.name)}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex items-center gap-1">
            <h1 className="text-sm font-medium">{getInitials(decoded?.name)}</h1>
            <ChevronDown className="size-4 transition-transform duration-200" />
          </div>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 shadow-xl rounded-xl border dark:border-neutral-800 z-50 animate-fadeIn">
            <div className="px-4 py-3 flex items-center gap-3 border-b dark:border-neutral-700">
              <Avatar className="w-10 h-10">
                {decoded?.profile ? (
                  <AvatarImage src={decoded.profile} alt={decoded.name} />
                ) : (
                  <AvatarFallback>{getInitials(decoded?.name)}</AvatarFallback>
                )}
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{decoded?.name || "Unknown User"}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {decoded?.email || "unknown@email.com"}
                </p>
              </div>
            </div>

            <button className="w-full px-4 py-3 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-neutral-800 text-left transition-colors">
              <CircleUserRound className="size-4" />
              <span>Profile</span>
            </button>
            <Separator />
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 flex items-center gap-2 hover:bg-red-100 dark:hover:bg-red-900 text-left text-red-600 dark:text-red-400 transition-colors"
            >
              <ArrowLeftFromLine className="size-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderDashboard;