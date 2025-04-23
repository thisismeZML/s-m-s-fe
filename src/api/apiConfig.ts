import { toast } from "sonner";
import axios from "axios";
import Cookies from "js-cookie";

const unAuthorized = () => {
    window.location.href = '/';
    toast.error('Unauthorized, please login Again');
}

const baseUrl = import.meta.env.SMS_API_BASE_URL || "http://192.168.100.175:5000";

const api = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request Interceptors
api.interceptors.request.use(
    async (config) => {
      try {
        const token = Cookies.get("accessToken")
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        toast.error("Error adding authorization token");
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

// Response Interceptors
api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || "An error occurred";
        const errMessageArray = error.response.data?.errors || []; // Ensure it's an array
  
        // Convert array to a string (comma-separated)
        const errDescription = Array.isArray(errMessageArray)
          ? errMessageArray.join(", ")
          : errMessageArray;
  
        switch (status) {
          case 400:
            toast.error("Request Failed", {
              description: errDescription || "Bad Request",
            });
            break;
            case 422:
            toast.error("Error", {
              description: errDescription || "Bad Request",
            });
            break;
            case 409:
            toast.error("Duplicate Error", {
              description: message || "Bad Request",
            });
            break;
          case 401:
            unAuthorized();
            break;
          case 403:
            toast.error("Access Denied", {
              description: "You do not have permission to perform this action.",
            });
            break;
          case 404:
            toast.error("Not Found", {
              description: message || "The requested resource was not found.",
            });
            break;
          case 500:
            toast.error("Server Error", {
              description: errDescription || "Something went wrong on our end.",
            });
            break;
          default:
            toast.error("Unexpected Error", {
              description: errDescription || `An error occurred (${status}).`,
            });
            break;
        }
      } else {
        toast.error("Network Error", {
          description: "Unable to connect to the server. Please try again later.",
        });
      }
  
      return Promise.reject(error);
    }
  );
  export default api;