import api from "@/api/apiConfig";

const createCourseList = async (request: CourseRequest) => {
    try {
        const res = await api.post("/course", {
            request
        });
        return res.data;
    }
    catch (error) {
        console.log(error);
    }
}

export default createCourseList;
