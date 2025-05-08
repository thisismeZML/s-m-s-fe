import api from "@/api/apiConfig";

const createDepartmentList = async (request: DepartmentRequest) => {
    const res = await api.post("/department", {
        request
    });
    return res.data;
}

export default createDepartmentList;