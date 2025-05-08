import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  role: string;
  token: string;
  expiresIn: number;
}

interface InitialState {
  user: User | null;
  setUser: (user: User) => void;
}

const useUserStore = create<InitialState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set(() => ({ user: { ...user } })),
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
