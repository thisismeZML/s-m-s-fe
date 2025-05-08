import CreateDepartmentPage from "@/features/superadmin/pages/CreateDepartmentPage"
import DepartmentListPage from "@/features/superadmin/pages/DepartmentListPage"
import EditDepartmentPage from "@/features/superadmin/pages/EditDepartmentPage"
import SuperAdminDashboardPage from "@/features/superadmin/pages/SuperAdminDashboardPage"
import ProtectedRoute from "@/hooks/useProtectedRoute"
import SuperAdminLayout from "@/layouts/SuperAdminLayout"
import rootLoader from "@/loader/RootLoader"
import UnauthorizedPage from "@/pages/UnauthorizedPage"

const Dashboard = [
    {
        path: "/",
        loader: rootLoader,
    },
    {
        path: "/superadmin",
        element: (
            <ProtectedRoute allowedRole={["SuperAdmin"]}>
                <SuperAdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <SuperAdminDashboardPage />
            },
            {
                path: "department-list",
                element: <DepartmentListPage />
            },
            {
                path: "department-list/edit/:id",
                element: <EditDepartmentPage />
            },
            {
                path: "create-department",
                element: <CreateDepartmentPage />
            }
        ]
    },
    {
        path: "/unauthorized",
        element: <UnauthorizedPage />
    }
]

export default Dashboard