import api from "@/api/apiConfig";

const fetchPrerequisite = async (
  pageNo: number,
  pageSize: number,
  sortOrder: "asc" | "desc",
  sortBy: string
) => {
  const res = await api.get<
    ApiResponse<PaginatedResponse<PrerequisiteResponse>>
  >(`prerequisite?page=${pageNo}&pageSize=${pageSize}&sortOrder=${sortOrder}&sortBy=${sortBy}`);

  return (
    res.data.data ?? {
      items: [],
      page: 1,
      pageSize,
      totalCount: 0,
      totalPages: 1,
    }
  );
};
 
export default fetchPrerequisite;
