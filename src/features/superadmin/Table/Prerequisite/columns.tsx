import { ColumnDef } from "@tanstack/react-table";
import getSortableHeader from "../Department/getSortableHeader";
import PrerequisiteAction from "./PrerequisiteAction";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const columns: ColumnDef<PrerequisiteResponse>[] = [
    {
        accessorKey: "requiredCourseCode",
        ...getSortableHeader("Required Course Code"),
    },
    {
        accessorKey: "requiredMinimumGrade",
        ...getSortableHeader("Required Minimum Grade"),
    },
    {
        accessorKey: "isMandatory",
        ...getSortableHeader("Is Mandatory"),
        cell: ({ row }) => {
          const value = row.getValue("isMandatory") as boolean;
          return (
            <span
              className={`px-2 py-1 rounded text-sm font-medium ${
                value
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {value ? "Mandatory" : "Not Mandatory"}
            </span>
          );
        },
      },      
    {
        accessorKey: "notes",
        header: "Notes",
        cell: ({ row }) => {
          const value = row.getValue("notes") as string;
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
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            return <PrerequisiteAction row={row.original} />;
        },
    },
];