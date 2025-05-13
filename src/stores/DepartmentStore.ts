import { create } from "zustand";

interface InitialState {
    department: DepartmentResponse[];
    setDepartment: (department: DepartmentResponse[]) => void;    
}

const useDepartmentStore = create<InitialState>()(
    (set) => ({
        department: [],
        setDepartment: (department) => set(() => ({ department })),
    })
);

export default useDepartmentStore;