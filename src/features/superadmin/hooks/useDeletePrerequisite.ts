import { useMutation, useQueryClient } from "@tanstack/react-query";
import deletePrerequisiteList from "../services/deletePrerequisiteList";
import { toast } from "sonner";

const useDeletePrerequisite = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn:deletePrerequisiteList,
        onSuccess: () => {
            toast.success("Deleted successfully");
            queryClient.invalidateQueries({
                queryKey: ["prerequisite"],
            });
        }
    });
    return mutation;
}

export default useDeletePrerequisite; 