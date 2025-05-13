import { useMutation, useQueryClient } from "@tanstack/react-query"
import updateCourseList from "../services/updateCourseList"
import { toast } from "sonner"

const useUpdateCourseList = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CourseRequest) => updateCourseList(id, data),
        mutationKey: ['course', id],
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['course', id]
            })
            toast.success("Course updated successfully");
        }
    })
} 

export default useUpdateCourseList;