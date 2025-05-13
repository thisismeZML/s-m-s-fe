import { create } from "zustand";

interface InitialState {
    course: CourseResponse[];
    setCourse: (course: CourseResponse[]) => void;    
}

const useCourseStore = create<InitialState>()(
    (set) => ({
        course: [],
        setCourse: (course) => set(() => ({ course })),
    })
);

export default useCourseStore;