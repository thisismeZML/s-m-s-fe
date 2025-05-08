declare global {
  interface DepartmentRequest {
    name: string;
    description: string;
    phoneNumber: string;
    email: string;
    officeLocation: string;
  }
  interface DepartmentResponse {
    id: string;
    code: string;
    name: string;
    description: string;
    phoneNumber: string;
    email: string;
    officeLocation: string;
  }
}

export {}
