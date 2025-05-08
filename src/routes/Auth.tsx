import AuthPage from "@/features/auth/pages/AuthPage"
import AuthLayout from "@/layouts/AuthLayout"

const Auth = [
    {
        path: "/login",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <AuthPage />
            }
        ]
    }
]

export default Auth;