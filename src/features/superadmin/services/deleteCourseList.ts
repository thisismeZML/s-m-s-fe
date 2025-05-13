import api from "@/api/apiConfig";

const deleteCourseList = async (id:string) => {
    const res = await api.delete(`/course/${id}`);
    return res.data;
}

export default deleteCourseList;
