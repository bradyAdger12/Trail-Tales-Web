import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "~/contexts/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    return <>{isAuthenticated && children}</>;
} 