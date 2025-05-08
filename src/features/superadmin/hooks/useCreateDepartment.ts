import { useMutation, useQueryClient } from "@tanstack/react-query";
import createDepartmentList from "../services/createDepartmentList";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createDepartmentList,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });
      toast.success("Department created successfully");
      navigate("/superadmin/department-list");
    },
  });
};

export default useCreateDepartment;
