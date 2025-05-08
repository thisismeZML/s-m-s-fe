import { useQuery } from "@tanstack/react-query";
import fetchDepartmentList from "../services/fetchDepartmentList";

export const useDepartment = (pageNo: number, pageSize: number, sortOrder: "asc" | "desc", sortBy: string,) => {
    return useQuery({
      queryKey: ["departments", pageNo, pageSize, sortOrder, sortBy],
      queryFn: () => fetchDepartmentList(pageNo, pageSize, sortOrder, sortBy),
    });
  };