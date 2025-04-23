import { Theme } from "@/stores/ThemeStore";

declare global {
    interface ThemeStore {
        theme: Theme;
        setTheme: (theme: Theme) => void;
        toggleTheme: () => void;
    }

    interface ThemeProviderProps {
        children: React.ReactNode;
    }
}

export {}