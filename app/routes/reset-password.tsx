import type { Route } from "./+types/signup";
import { useNavigate, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { resetPassword } from "~/api/auth";
import { useToast } from "~/contexts/ToastContext";
import { APP_NAME } from "~/lib/constants";
import { ErrorAlert } from "~/components/alerts/Alerts";
import UnprotectedRoute from "~/components/UnprotectedRoute";
export function meta({ }: Route.MetaArgs) {
    return [
        { title: `Reset Password - ${APP_NAME}` },
        { name: "description", content: `Reset your password for ${APP_NAME}.` },
    ];
}

export default function ResetPassword() {
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [formData, setFormData] = useState({
        token,
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState<string | null>(!token ? "Token is required" : null);
    const [passwordValidation, setPasswordValidation] = useState({
        hasUpperCase: false,
        hasSpecialChar: false,
        hasMinLength: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);
    const { showToast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const password = formData.password;
        setPasswordValidation({
            hasUpperCase: /[A-Z]/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            hasMinLength: password.length >= 8
        });
    }, [formData.password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setResetLoading(true);
            await resetPassword({
                token: token as string,
                password: formData.password
            })
            navigate("/login")
            showToast("Password reset successfully", "success");
        } catch (error: any) {
            setError(error.message);
        } finally {
            setResetLoading(false);
        }
    };

    const validateForm = () => {
        if (!formData.password) {
            setError("Password is required");
            return false;
        }
        if (!formData.confirmPassword) {
            setError("Confirm password is required");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }
        if (!passwordValidation.hasMinLength) {
            setError("Password must be at least 8 characters long");
            return false;
        }
        if (!passwordValidation.hasUpperCase) {
            setError("Password must contain at least one uppercase letter");
            return false;
        }
        if (!passwordValidation.hasSpecialChar) {
            setError("Password must contain at least one special character");
            return false;
        }
        return true;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <UnprotectedRoute>
            <div>
                <div className="relative pt-12">
                    <section className="container mx-auto px-4">
                        <div className="max-w-md mx-auto">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 mb-2">
                                    Reset Password
                                </h1>
                                <p className="text-gray-400">Enter your new password below</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                        Password
                                    </label>
                                    <div className="w-full flex items-center bg-gray-800/60 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white placeholder-gray-400">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            className="w-full px-4 py-2"
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            autoComplete="off"
                                            required
                                        />
                                        {<span className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400/40 cursor-pointer mr-3`} onClick={() => setShowPassword(!showPassword)} />}
                                    </div>
                                    <div className="mt-2 space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <svg
                                                className={`w-4 h-4 ${passwordValidation.hasMinLength ? 'text-green-500' : 'text-gray-400'}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                            </svg>
                                            <span className={`text-sm ${passwordValidation.hasMinLength ? 'text-green-500' : 'text-gray-400'}`}>
                                                At least 8 characters
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <svg
                                                className={`w-4 h-4 ${passwordValidation.hasUpperCase ? 'text-green-500' : 'text-gray-400'}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                            </svg>
                                            <span className={`text-sm ${passwordValidation.hasUpperCase ? 'text-green-500' : 'text-gray-400'}`}>
                                                One uppercase letter
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <svg
                                                className={`w-4 h-4 ${passwordValidation.hasSpecialChar ? 'text-green-500' : 'text-gray-400'}`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                            </svg>
                                            <span className={`text-sm ${passwordValidation.hasSpecialChar ? 'text-green-500' : 'text-gray-400'}`}>
                                                One special character
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                                        Confirm Password
                                    </label>
                                    <div className="w-full flex items-center bg-gray-800/60 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white placeholder-gray-400">

                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="w-full px-4 py-2"
                                            autoComplete="off"
                                            required
                                        />
                                        {<span className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400/40 cursor-pointer mr-3`} onClick={() => setShowPassword(!showPassword)} />}
                                    </div>
                                </div>

                                {error && (
                                    <ErrorAlert message={error} />
                                )}

                                <button
                                    type="submit"
                                    className="w-full btn btn-primary text-black px-8 py-3 text-lg font-semibold"
                                    disabled={resetLoading || !!error || !formData.password || !formData.confirmPassword}
                                >
                                    Reset Password {resetLoading && <span className="loading loading-spinner loading-xs"></span>}
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </UnprotectedRoute>
    );
}
