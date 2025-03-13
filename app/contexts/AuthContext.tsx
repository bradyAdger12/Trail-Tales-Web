import axios from "axios";
import { createContext, use, useContext, useEffect, useLayoutEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { api, authApi, type ErrorMessage } from "~/lib/axios";
import { authLogin, getRefreshToken, type LoginRequest, type User } from "~/models/auth";

interface AuthContextType {
    login: (request: LoginRequest) => Promise<void>;
    logout: () => void;
    token: string | null;
    refreshToken: string | null;
    user: User | null;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [cookies, setCookie] = useCookies(['token', 'refreshToken', 'user']);
    const [user, setUser] = useState<User | null>(cookies.user);
    const isAuthenticated = !!cookies.token;

    function logout() {
        setCookie('token', null);
        setCookie('refreshToken', null);
        setCookie('user', null);
        setUser(null);
    }
    async function login(request: LoginRequest) {
        try {
            const response = await authLogin(request);
            setCookie('token', response.token);
            setCookie('refreshToken', response.refreshToken);
            setUser(response.user);
            setCookie('user', response.user);
        } catch (error) {
            throw error;
        }
    }

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
                const refreshToken = cookies.refreshToken;
                
                if (!refreshToken) {
                    return Promise.reject(formattedError);
                }
                const response = await getRefreshToken(refreshToken)
                setCookie('token', response.token);
                setCookie('refreshToken', response.refreshToken);
                const token = cookies.token;
                if (token) {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return axios(originalRequest);
                }
            } catch (refreshError) {
                setCookie('token', null);
                setCookie('refreshToken', null);
                
                // If we're in a browser environment, redirect to login
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                
                return Promise.reject(formattedError);
            }
        }
        return Promise.reject(formattedError);
    }

    useLayoutEffect(() => {
        authApi.interceptors.response.use(
            (response) => response,
            handleError
        );
        
        api.interceptors.response.use(
            (response) => response, //skip response
            handleError
        );
        // Add auth interceptor
        authApi.interceptors.request.use(
            async (config) => {
                let token = cookies.token;
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            }
        );
    })
    return <AuthContext.Provider value={{ login, isAuthenticated, token: cookies.token, refreshToken: cookies.refreshToken, user, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}


