import { RouterProvider } from "react-router-dom";
import ThemeProvider from "./theme/ThemeProvider";
import router from "./routes/route";
import { Toaster } from "sonner";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster position="top-right" duration={3000} />
    </ThemeProvider>
  )
}

export default App;