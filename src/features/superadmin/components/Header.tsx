import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ArrowLeftFromLine, ChevronDown, CircleUserRound } from "lucide-react";

import Header from "@/features/auth/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const HeaderDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/login");
  };

  // 👉 Close dropdown when clicking outside
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
          className="flex items-center gap-3 cursor-pointer"
        >
          <Avatar className="w-9 h-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1">
            <h1 className="text-sm font-medium">CN</h1>
            <ChevronDown className="size-4" />
          </div>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-[150px] bg-white dark:bg-neutral-900 shadow-lg rounded-md overflow-hidden border dark:border-neutral-800 z-50">
            <button className="w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-neutral-800 text-left">
              <CircleUserRound className="size-4" />
              <span>Profile</span>
            </button>
            <Separator />
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 flex items-center gap-2 hover:bg-red-100 dark:hover:bg-red-900 text-left text-red-600 dark:text-red-400"
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
