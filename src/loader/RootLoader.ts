import { redirect } from "react-router-dom"

const rootLoader = () => {
    return redirect(`/login`)
}

export default rootLoader;