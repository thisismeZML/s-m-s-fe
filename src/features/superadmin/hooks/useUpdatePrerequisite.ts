import { useMutation, useQueryClient } from "@tanstack/react-query";
import updatePrerequisiteList from "../services/updatePrerequisiteList";
import { toast } from "sonner";

const useUpdatePrerequisite = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: PrerequisiteRequest) =>
      updatePrerequisiteList(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["prerequisite", id],
      });
      toast.success("Prerequisite updated successfully");
    },
  });
};

export default useUpdatePrerequisite;
