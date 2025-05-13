import { useQuery } from "@tanstack/react-query"
import fetchCourseList from "../services/fetchCourseList"

const useCourseList = (pageNo: number, pageSize: number, sortOrder: "asc" | "desc", sortBy: string) =>{
    return useQuery({
        queryKey: ['course', pageNo, pageSize, sortOrder, sortBy],
        queryFn: () => fetchCourseList(pageNo, pageSize, sortOrder, sortBy)
    })
}

export default useCourseList;
