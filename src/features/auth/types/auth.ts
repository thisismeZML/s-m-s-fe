declare global {
  interface LoginRequest {
    email: string;
    password: string;
  }

  interface LoginResponse {
    accessToken: string;
    expiresIn: number;
  }
}

export {};
