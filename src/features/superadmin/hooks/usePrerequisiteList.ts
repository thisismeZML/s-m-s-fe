import { useQuery } from "@tanstack/react-query";
import fetchPrerequisite from "../services/fetchPrerequisite";

const usePrerequisiteList = (pageNo: number,
    pageSize: number,
    sortOrder: "asc" | "desc",
    sortBy: string) => {
    return useQuery({
        queryKey: ["prerequisite", pageNo, pageSize, sortOrder, sortBy],
        queryFn: () => fetchPrerequisite(pageNo, pageSize, sortOrder, sortBy),
    });
};

export default usePrerequisiteList;
