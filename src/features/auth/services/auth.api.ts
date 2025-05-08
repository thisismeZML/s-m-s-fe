import useUserStore from "@/stores/UserStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import { rolePaths } from "@/constants/role";
import api from "@/api/apiConfig";

export const Login = () => {
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);

    return useMutation({
        mutationFn: async (request: LoginRequest) => {
            const res = await api.post<ApiResponse<LoginResponse>>(`/auth`, {
                request
            });

            console.log(res.data)

            return res.data;
        },

        onSuccess: (data) => {
            if(data.isSuccess && data.data) {
                const { accessToken, expiresIn } = data.data;

                const decodedToken = jwtDecode<{ typ: string, exp: number }>(accessToken);

                if(decodedToken) {
                    setUser({
                        role: decodedToken.typ,
                        token: accessToken,
                        expiresIn
                    });
                }

                Cookies.set("accessToken", accessToken, { expires: expiresIn / 86400 });

                navigate(rolePaths[decodedToken.typ] || "/auth");
            }
        }
    })
}

export default Login;
