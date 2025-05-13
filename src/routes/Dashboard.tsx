import CourseListPage from "@/features/superadmin/pages/CourseListPage"
import CreateCoursePage from "@/features/superadmin/pages/CreateCoursePage"
import CreateDepartmentPage from "@/features/superadmin/pages/CreateDepartmentPage"
import CreatePrerequisitePage from "@/features/superadmin/pages/CreatePrerequisitePage"
import DepartmentListPage from "@/features/superadmin/pages/DepartmentListPage"
import EditCoursePage from "@/features/superadmin/pages/EditCoursePage"
import EditDepartmentPage from "@/features/superadmin/pages/EditDepartmentPage"
import EditPrerequisitePage from "@/features/superadmin/pages/EditPrerequisitePage"
import PrerequisiteListPage from "@/features/superadmin/pages/PrerequisiteListPage"
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
            },
            {
                path: "course-list",
                element: <CourseListPage />
            },
            {
                path: "create-course",
                element: <CreateCoursePage />
            },
            {
                path: "course-list/edit/:id",
                element: <EditCoursePage />
            },
            {
                path: "prerequisite-list",
                element: <PrerequisiteListPage />
            },
            {
                path: "create-prerequisite",
                element: <CreatePrerequisitePage />
            },
            {
                path: "prerequisite-list/edit/:id",
                element: <EditPrerequisitePage />
            }
        ]
    },
    {
        path: "/unauthorized",
        element: <UnauthorizedPage />
    }
]

export default Dashboard