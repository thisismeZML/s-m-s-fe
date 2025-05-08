// components/table/department-actions.tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DepartmentItem } from "./columns"; // adjust path as needed
import { Link } from "react-router-dom";
import useDeleteDepartment from "../../hooks/useDeleteDepartment";

interface Props {
  row: DepartmentItem;
}

const DepartmentAction = ({ row }: Props) => {

  const { mutate: deleteDepartment } = useDeleteDepartment();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.id)}>
          View
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Link to={`edit/${row.id}`}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => deleteDepartment(row.id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DepartmentAction;
