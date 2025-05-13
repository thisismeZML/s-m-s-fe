import api from "@/api/apiConfig";

const updatePrerequisiteList = async (id: string, request: PrerequisiteRequest) => {
    const res = await api.put(`/prerequisite/${id}`, {
        request
    });
    return res.data;
}

export default updatePrerequisiteList;