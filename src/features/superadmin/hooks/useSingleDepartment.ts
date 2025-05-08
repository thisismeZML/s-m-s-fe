import { useQuery } from "@tanstack/react-query"
import fetchSingleDepartment from "../services/fetchSingleDepartmentList"

const useSingleDepartment = (id: string) => {
    return useQuery({
        queryKey: ["single-department", id],
        queryFn: () => fetchSingleDepartment(id),
    })
}

export default useSingleDepartment;
