import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { authLogin, type LoginRequest, type User } from "~/models/auth";

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
    const [token, setToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    function logout() {
        setToken(null);
        setRefreshToken(null);
        setUser(null);
        if (typeof window === "undefined") return
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
    }
    async function login(request: LoginRequest) {
        try {
            const response = await authLogin(request);
            setToken(response.token);
            setRefreshToken(response.refreshToken);
            setUser(response.user);
            if (typeof window === "undefined") return
            localStorage.setItem("token", response.token);
            localStorage.setItem("refreshToken", response.refreshToken);
            localStorage.setItem("user", JSON.stringify(response.user));

        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        if (typeof window === "undefined") return;
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");
        const user = localStorage.getItem("user");
        if (token) {
            setToken(token);
        }
        if (refreshToken) {
            setRefreshToken(refreshToken);
        }
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    const isAuthenticated = typeof window !== "undefined" && !!token;

    return <AuthContext.Provider value={{ login, isAuthenticated, token, refreshToken, user, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}


