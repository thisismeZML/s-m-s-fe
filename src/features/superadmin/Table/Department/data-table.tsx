import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
  // getPaginationRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have this Skeleton component
import { useState } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  pageNo: number;
  pageSize: number;
  totalPages: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onPageChange: (page: number) => void;
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
  onPageSizeChange: (size: number) => void; // Callback for changing page size
}

const DataTable = <TData, TValue>({
  columns,
  data,
  isLoading,
  pageNo,
  pageSize,
  totalPages,
  sortBy,
  sortOrder,
  onPageChange,
  onSortChange,
  onPageSizeChange,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: sortBy, desc: sortOrder === "desc" },
  ]);

  const table = useReactTable({
    data,
    columns,
    manualSorting: true,
    manualPagination: true,
    pageCount: totalPages,
    state: {
      sorting,
    },
    onSortingChange: (updater) => {
      const newSort =
        typeof updater === "function" ? updater(sorting) : updater;
      setSorting(newSort);
      if (newSort.length > 0) {
        onSortChange(newSort[0].id, newSort[0].desc ? "desc" : "asc");
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button className="bg-blue-500 hover:bg-blue-400 text-white" asChild>
          <Link to="/superadmin/create-department">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Department
          </Link>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Skeleton Loader
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Skeleton className="h-12 w-full" />
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              // No Data Message
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  There is no data available.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center py-4">
        <div className="flex gap-2">
          {/* Page Size Dropdown */}
          <select
            className="p-2 border rounded-md"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          >
            {[5, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          {/* Pagination Buttons */}
          <Button
            variant="outline"
            disabled={pageNo <= 1}
            onClick={() => onPageChange(pageNo - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={pageNo >= totalPages}
            onClick={() => onPageChange(pageNo + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
