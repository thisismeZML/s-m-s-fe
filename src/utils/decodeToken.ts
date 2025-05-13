import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  sub: string;
  name: string;
  email: string;
  profile: string;
  role: string;
  [key: string]: any;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    if (!token) {
      console.error("No token provided");
      return null;
    }
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Invalid or expired token", error);
    return null;
  }
};
