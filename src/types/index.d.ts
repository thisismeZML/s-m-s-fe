declare global {
  interface ProtectedRouteProps {
    allowedRole: string[];
    children: React.ReactNode;
  }
  
  interface ApiRequest<T> {
    request: T;
  }

  interface ApiResponse<T> {
    isSuccess: boolean;
    message: string;
    data?: T;
    statusCode?: number;
    errors?: string[];
  }
}

export {};
 