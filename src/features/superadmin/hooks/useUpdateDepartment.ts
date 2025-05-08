import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateDepartmentList from "../services/updateDepartmentList";

const useUpdateDepartment = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DepartmentRequest) => updateDepartmentList(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments", id],
      });
    },
  });
};

export default useUpdateDepartment;
