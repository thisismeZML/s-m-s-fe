import { useMutation, useQueryClient } from "@tanstack/react-query"
import deleteCourseList from "../services/deleteCourseList";
import { toast } from "sonner";

const useDeleteCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteCourseList,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['course']
            })
            toast.success("Deleted successfully");
        }
    })
}

export default useDeleteCourse;
