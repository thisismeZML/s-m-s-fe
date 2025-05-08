import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteDepartment from "../services/deleteDepartmentList";

const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
    },
  });
};

export default useDeleteDepartment;
