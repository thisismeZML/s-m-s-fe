import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Theme } from './stores/ThemeStore.ts'

// Theme
const theme = localStorage.getItem("theme") || Theme.light;
document.documentElement.classList.toggle("dark", theme === Theme.dark);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <StrictMode>
      <App />
    </StrictMode>
  </QueryClientProvider>,
)
