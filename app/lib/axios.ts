import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getRefreshToken } from "~/models/auth";

interface ErrorMessage {
    status: number;
    message: string;
}

const baseURL = import.meta.env.VITE_SERVER_BASE_URL;
const timeout = 15000;

export const api = axios.create({
    baseURL,
    timeout: 15000,
});

export const authApi = axios.create({
    baseURL,
    timeout: 15000,
});


authApi.interceptors.response.use(
    (response) => response,
    handleError
);

authApi.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);
api.interceptors.response.use(
    (response) => response, //skip response
    handleError
);

async function handleError(error: any) {
    const originalRequest = error.config;
    let formattedError: ErrorMessage = {
        status: error.response?.status || 500,
        message: "An unknown error occurred.",
    };
    if (error.response) {
        const { status, data } = error.response;
        formattedError.status = status;
        formattedError.message =
            data?.message || `Request failed with status ${status}`;
    } else if (error.request) {
        formattedError.message = "Network error. Please try again later.";
    }
    // Handle 401 Unauthorized errors by attempting to refresh the token
    if (error.response && error.response.status === 401) {
        try {
            if (originalRequest.url.includes('/refresh') || originalRequest._retry) {
                return Promise.reject(formattedError);
            }
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refreshToken");
            
            if (!refreshToken) {
                return Promise.reject(formattedError);
            }
            await getRefreshToken()
            const token = localStorage.getItem("token");
            if (token) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
            }
        } catch (refreshError) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            
            // If we're in a browser environment, redirect to login
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
            
            return Promise.reject(formattedError);
        }
    }
    return Promise.reject(formattedError);
}

