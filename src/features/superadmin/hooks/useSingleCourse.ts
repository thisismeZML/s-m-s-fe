import { useQuery } from "@tanstack/react-query";
import fetchSingleCourse from "../services/fetchSingleCourse";

const useSingleCourse = (id: string) => {
    return useQuery({
        queryKey: ["single-course", id],
        queryFn: () => fetchSingleCourse(id),
    })
}

export default useSingleCourse