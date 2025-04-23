// src/store/themeStore.ts
import { create } from "zustand";

export enum Theme {
  light = "light",
  dark = "dark"
}

// Helper to validate enum values
const isValidTheme = (value: unknown): value is Theme => {
  return (
    typeof value === "string" && Object.values(Theme).includes(value as Theme)
  );
};

const storedTheme = localStorage.getItem("theme");
const initialTheme: Theme = isValidTheme(storedTheme)
  ? storedTheme
  : Theme.light;

const useThemeStore = create<ThemeStore>((set) => ({
  theme: initialTheme,
  setTheme: (theme: Theme) => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === Theme.dark);
    set({ theme });
  },
  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === Theme.light ? Theme.dark : Theme.light;
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle(
        "dark",
        newTheme === Theme.dark
      );
      return { theme: newTheme };
    });
  },
}));

export default useThemeStore;
