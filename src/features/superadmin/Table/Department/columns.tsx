import { ColumnDef } from "@tanstack/react-table";
import getSortableHeader from "./getSortableHeader";

export interface DepartmentItem {
  id: string;
  code: string;
  name: string;
  description: string;
  phoneNumber: string;
  email: string;
  officeLocation: string;
}

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DepartmentAction from "./DepartmentAction";

export const columns: ColumnDef<DepartmentItem>[] = [
  {
    accessorKey: "code",
    ...getSortableHeader("Code"),
  },
  {
    accessorKey: "name",
    ...getSortableHeader("Name"),
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
    accessorKey: "phoneNumber",
    ...getSortableHeader("Phone Number"),
  },
  {
    accessorKey: "email",
    ...getSortableHeader("Email"),
  },
  {
    accessorKey: "officeLocation",
    ...getSortableHeader("Office Location"),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <DepartmentAction row={row.original}/>,
  },
];
