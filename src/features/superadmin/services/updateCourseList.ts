import api from "@/api/apiConfig";

const updateCourseList = async (id: string, data: CourseRequest) => {
    const res = await api.put(`/course/${id}`, {
        request: data
    });
    return res.data;
}

export default updateCourseList;
