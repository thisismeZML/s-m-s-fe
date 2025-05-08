import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface DropdownItem {
  label: string;
  href: string;
}

interface SidebarDropdownProps {
  icon: React.ReactNode;
  label: string;
  items: DropdownItem[];
  collapsed: boolean;
}

const SidebarDropdown = ({
  icon,
  label,
  items,
  collapsed,
}: SidebarDropdownProps) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    if (!collapsed) setOpen(!open);
  };

  return (
    <div>
      {/* Dropdown Header */}
      <div
        onClick={toggleDropdown}
        className={`flex items-center py-2 cursor-pointer hover:bg-muted transition-all ${
          collapsed ? "justify-center px-3 ml-[3px]" : "justify-start px-4 gap-2"
        }`}
      >
        <div className="min-w-[24px] text-center">{icon}</div>
        {!collapsed && <span className="text-sm font-medium">{label}</span>}

        {/* Chevron only when expanded */}
        {!collapsed && (
          <div className="ml-auto">
            {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        )}
      </div>

      {/* Dropdown Items with Animation */}
      <AnimatePresence initial={false}>
        {open && !collapsed && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {
                opacity: 1,
                height: "auto",
                transition: {
                  when: "beforeChildren",
                  staggerChildren: 0.05,
                },
              },
              collapsed: {
                opacity: 0,
                height: 0,
                transition: {
                  when: "afterChildren",
                },
              },
            }}
            className="flex flex-col px-10 overflow-hidden"
          >
            {items.map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  open: { opacity: 1, y: 0 },
                  collapsed: { opacity: 0, y: -10 },
                }}
                // transition={{ duration: 0.2 }}
              >
                <Link
                  to={item.href}
                  className="text-sm px-2 py-3 flex items-center rounded hover:bg-muted transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarDropdown;
