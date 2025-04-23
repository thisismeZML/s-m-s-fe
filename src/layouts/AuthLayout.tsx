import Header from "@/features/auth/components/Header";
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <>
        <Header />
        <Outlet />
    </>
  )
}

export default AuthLayout;