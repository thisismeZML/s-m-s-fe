import api from "@/api/apiConfig";

const updateDepartmentList = async (id: string, data: DepartmentRequest) => {
  const res = await api.put(`/department/${id}`, { request: data });
  return res.data;
};

export default updateDepartmentList;
