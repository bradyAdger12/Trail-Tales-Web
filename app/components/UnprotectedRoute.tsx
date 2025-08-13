import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "~/contexts/AuthContext";

interface UnprotectedRouteProps {
    children: React.ReactNode;
}

export default function UnprotectedRoute({ children }: UnprotectedRouteProps) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [show, setShow] = useState(false);
    useEffect(() => {
        if (isAuthenticated) {
            // console.log("isAuthenticated", isAuthenticated)
            navigate("/me");
        } else {
            setShow(true);
        }
    }, [isAuthenticated]);

    return <>{show && children}</>;
} 