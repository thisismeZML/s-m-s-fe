import api from "@/api/apiConfig";

const createPrerequisiteList = async (request: PrerequisiteRequest) => {
    const res = await api.post("/prerequisite", {
        request
    });
    return res.data;
}

export default createPrerequisiteList;
