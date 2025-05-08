import api from "@/api/apiConfig";

const fetchSingleDepartment = async (id: string) => {
  const res = await api.get<ApiResponse<DepartmentResponse>>(`/department/${id}`);
  return res.data.data;
};

export default fetchSingleDepartment;