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
  import { Link } from "react-router-dom";
import useDeleteCourse from "../../hooks/useDeleteCourse";
  
  interface Props {
    row: CourseResponse;
  }
  
  const CourseAction = ({ row }: Props) => {
  
    const { mutate: deleteCourse } = useDeleteCourse();
  
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
          <DropdownMenuItem onClick={() => deleteCourse(row.id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
  export default CourseAction;
  