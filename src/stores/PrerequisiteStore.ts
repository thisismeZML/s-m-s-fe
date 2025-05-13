import { create } from "zustand";

interface InitialState {
    prerequisite: PrerequisiteResponse[];
    setPrerequisite: (prerequisite: PrerequisiteResponse[]) => void;    
}

const usePrerequisiteStore = create<InitialState>()(
    (set) => ({
        prerequisite: [],
        setPrerequisite: (prerequisite) => set(() => ({ prerequisite })),
    })
);

export default usePrerequisiteStore;