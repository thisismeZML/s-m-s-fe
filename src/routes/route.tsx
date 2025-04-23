import { createBrowserRouter } from "react-router-dom"
import Auth from "./Auth"

const router = createBrowserRouter([
    ...Auth,
])

export default router;