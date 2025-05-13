import api from "@/api/apiConfig";

const fetchSinglePrerequisiite = async (id: string) => {
  const res = await api.get<ApiResponse<PrerequisiteResponse>>(
    `/prerequisite/${id}`
  );
  return res.data.data;
};

export default fetchSinglePrerequisiite;
