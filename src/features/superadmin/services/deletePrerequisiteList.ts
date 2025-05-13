import api from "@/api/apiConfig"

const deletePrerequisiteList = async (id:string) => {
    const res = await api.delete(`/prerequisite/${id}`);
    return res.data;
}

export default deletePrerequisiteList;
