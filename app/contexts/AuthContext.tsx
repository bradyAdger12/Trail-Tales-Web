import axios from "axios";
import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { api, authApi, type ErrorMessage } from "~/lib/axios";
import { authLogin, fetchMe, getRefreshToken, googleAuth, type LoginRequest, type User } from "~/api/auth";
import { useQuery } from "@tanstack/react-query";

interface AuthContextType {
    login: (request: LoginRequest) => Promise<void>;
    logout: () => void;
    token: string | null;
    refreshToken: string | null;
    user: Partial<User> | null;
    handleGoogleLogin: (googleAuthToken: string) => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<Partial<User> | null>>
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [cookies, setCookie] = useCookies(['token', 'refreshToken', 'user']);
    const [user, setUser] = useState<Partial<User> | null>(cookies.user);
    const isAuthenticated = !!cookies.token;

    const { data: userData } = useQuery({
        queryKey: ['user'], queryFn: () => fetchMe().then((response) => {
            setUser(response)
            return response
        }),
        enabled: isAuthenticated
    })

    function logout() {
        setCookie('token', null);
        setCookie('refreshToken', null);
        setCookie('user', null);
        setUser(null);
    }
    
    async function handleGoogleLogin(googleAuthToken: string) {
        try {
            const response = await googleAuth(googleAuthToken);
            setCookie('token', response.token);
            setCookie('refreshToken', response.refreshToken);
            setUser(response.user);
            setCookie('user', response.user);
        } catch (error) {
            throw error;
        }
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
                if (response.token) {
                    originalRequest.headers.Authorization = `Bearer ${response.token}`;
                    return axios(originalRequest);
                }
            } catch (refreshError) {
                setCookie('token', null);
                setCookie('refreshToken', null);

                // If we're in a browser environment, redirect to login
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                console.error(formattedError)
                return Promise.reject(formattedError);
            }
        }
        return Promise.reject(formattedError);
    }

    useEffect(() => {
        setCookie('user', user)
    }, [user])

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
    return <AuthContext.Provider value={{ login, isAuthenticated, token: cookies.token, refreshToken: cookies.refreshToken, user, setUser, logout, handleGoogleLogin }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}


