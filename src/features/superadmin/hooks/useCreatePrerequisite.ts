import { useMutation } from "@tanstack/react-query";
import createPrerequisiteList from "../services/createPrerequsiteList";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const useCreatePrerequisite = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: createPrerequisiteList,
        onSuccess: () => {
            toast.success("Prerequisite created successfully");
            queryClient.invalidateQueries({
                queryKey: ["prerequisite"],
            });
            navigate("/superadmin/prerequisite-list");
        }
    })
    
}

export default useCreatePrerequisite;

