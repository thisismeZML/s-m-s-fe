import api from "@/api/apiConfig";

const fetchSingleCourse = async (id: string) => {
  const response = await api.get<ApiResponse<CourseResponse>>(`/course/${id}`);
  return response.data.data;
};

export default fetchSingleCourse;
