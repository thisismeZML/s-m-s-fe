import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteDepartment from "../services/deleteDepartmentList";
import { toast } from "sonner";

const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
      toast.success("Deleted successfully");
    },
  });
};

export default useDeleteDepartment;
