import { useMutation, useQueryClient } from "@tanstack/react-query";
import createCourseList from "../services/createCourseList";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const useCreateCourse = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createCourseList,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course-list"],
      });
      toast.success("Course created successfully");
      navigate("/superadmin/course-list");
    },
  });
};

export default useCreateCourse;
