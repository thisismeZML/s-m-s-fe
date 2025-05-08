import api from "@/api/apiConfig";

const deleteDepartment = async (id: string) => {
  const res = await api.delete(`/department/${id}`);
  return res.data;
};

export default deleteDepartment;
