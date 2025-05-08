import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const getSortableHeader = (label: string) => ({
    header: ({ column }: any) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  });

  export default getSortableHeader;