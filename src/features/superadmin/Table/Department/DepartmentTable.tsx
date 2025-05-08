import { useState } from "react";
import { useDepartment } from "../../hooks/useDepartmentList";
import { columns } from "./columns";
import DataTable from "./data-table";

const DepartmentTable = () => {
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);  // Make pageSize state mutable
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState("id");

  const { data, isLoading } = useDepartment(pageNo, pageSize, sortOrder, sortBy);

  // Handle page size change
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageNo(1);  // Optionally reset to the first page when page size changes
  };

  return (
    <div className="p-4">
      <DataTable
        columns={columns}
        data={data?.items ?? []}
        isLoading={isLoading}
        pageNo={pageNo}
        pageSize={pageSize}
        totalPages={data?.totalPages ?? 1}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onPageChange={(page) => setPageNo(page)}
        onSortChange={(column, order) => {
          setSortBy(column);
          setSortOrder(order);
        }}
        onPageSizeChange={handlePageSizeChange}  // Pass onPageSizeChange to DataTable
      />
    </div>
  );
};

export default DepartmentTable;
