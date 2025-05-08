import useUserStore from "@/stores/UserStore";
import Cookies from "js-cookie"
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRole, children }) => {
    
    const token = Cookies.get("accessToken");
    const user = useUserStore((state) => state.user)

    if(!token) {
        return <Navigate to="/login" />;
    }

    if(!user || !allowedRole.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children ? <>{children}</> : <Outlet />;
}

export default ProtectedRoute;
