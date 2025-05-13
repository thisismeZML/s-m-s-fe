import { ColumnDef } from "@tanstack/react-table";
import getSortableHeader from "../Department/getSortableHeader";
import CourseAction from "./CourseAction";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SquareArrowOutUpRight } from "lucide-react";

export const columns: ColumnDef<CourseResponse>[] = [
  {
    accessorKey: "code",
    ...getSortableHeader("Code"),
  },
  {
    accessorKey: "profile",
    header: "Profile",
    cell: ({ row }) => {
      const imgUrl = row.getValue("profile") as string;
      return (
        <img
          src={imgUrl}
          alt="Profile"
          className="w-10 h-10 object-cover rounded-full"
          onError={(e) => {
            e.currentTarget.src = "/fallback-profile.png"; // Optional fallback
          }}
        />
      );
    },
  },
  {
    accessorKey: "title",
    ...getSortableHeader("Title"),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const value = row.getValue("description") as string;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="max-w-[200px] truncate text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer">
                {value}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[300px]">{value}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "creditHours",
    ...getSortableHeader("Credit Hours"),
  },
  {
    accessorKey: "semesterOffered",
    ...getSortableHeader("Semester Offered"),
  },
  {
    accessorKey: "maxEnrollment",
    ...getSortableHeader("Max Enrollment"),
  },
  {
    accessorKey: "syllabusUrl",
    header: "Syllabus",
    cell: ({ row }) => {
      const url = row.getValue("syllabusUrl") as string;
      return url ? (
        <button className="flex items-center ">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-3 py-1 text-sm text-blue-500 rounded  transition"
          >
            View
          </a>
          <SquareArrowOutUpRight className="h-3 w-3 text-blue-500" />
        </button>
      ) : (
        <span className="text-gray-400 italic">No syllabus</span>
      );
    },
  },
  {
    accessorKey: "deliveryMode",
    ...getSortableHeader("Delivery Mode"),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CourseAction row={row.original} />,
  },
];
