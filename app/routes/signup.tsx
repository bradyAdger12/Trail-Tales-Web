import type { Route } from "./+types/signup";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { signUp } from "~/api/auth";
import { useToast } from "~/contexts/ToastContext";
import { APP_NAME, TIMEZONES } from "~/lib/constants";
import UnprotectedRoute from "~/components/UnprotectedRoute";
import { useAuth } from "~/contexts/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: `Sign Up - ${APP_NAME}` },
    { name: "description", content: `Create your account and start your adventure with ${APP_NAME}.` },
  ];
}

export default function SignUp() {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [passwordValidation, setPasswordValidation] = useState({
    hasUpperCase: false,
    hasSpecialChar: false,
    hasMinLength: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const { showToast } = useToast();
  const { login, handleGoogleLogin } = useAuth();
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
      setSignupLoading(true);
      await signUp({
        display_name: formData.displayName,
        email: formData.email,
        password: formData.password,
        timezone: formData.timezone
      })
      await login({
        email: formData.email,
        password: formData.password
      })
      navigate("/")
      showToast("Account created successfully", "success");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setSignupLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.displayName) {
      setError("Display name is required");
      return false;
    }
    if (!formData.email) {
      setError("Email is required");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (!formData.confirmPassword) {
      setError("Confirm password is required");
      return false;
    }
    if (!formData.timezone) {
      setError("Timezone is required");
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
                <h1 className="text-3xl font-bold mb-2">
                  Create Your Account
                </h1>
                <p>Your adventure begins here</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="displayName" className="block text-sm font-medium">
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    placeholder="How should we call you?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="timezone" className="block text-sm font-medium">
                    Timezone
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    required
                  >
                    {TIMEZONES.map((timezone) => (
                      <option key={timezone.value} value={timezone.value}>
                        {timezone.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <div className="w-full flex items-center">
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
                    {<span className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} cursor-pointer mr-3`} onClick={() => setShowPassword(!showPassword)} />}
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center space-x-2">
                      <svg
                        className={`w-4 h-4 ${passwordValidation.hasMinLength ? 'text-success' : ''}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                      <span className={`text-sm ${passwordValidation.hasMinLength ? 'text-success' : ''}`}>
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg
                        className={`w-4 h-4 ${passwordValidation.hasUpperCase ? 'text-success' : ''}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                      <span className={`text-sm ${passwordValidation.hasUpperCase ? 'text-success' : ''}`}>
                        One uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg
                        className={`w-4 h-4 ${passwordValidation.hasSpecialChar ? 'text-success' : ''}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                      <span className={`text-sm ${passwordValidation.hasSpecialChar ? 'text-success' : ''}`}>
                        One special character
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium">
                    Confirm Password
                  </label>
                  <div className="w-full flex items-center">

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
                    {<span className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} cursor-pointer mr-3`} onClick={() => setShowPassword(!showPassword)} />}
                  </div>
                </div>

                {error && (
                  <div className="text-error text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full btn btn-primary px-8 py-3 text-lg font-semibold"
                >
                  Create Account {signupLoading && <span className="loading loading-spinner loading-xs"></span>}
                </button>
              </form>
              <div className="mt-6">
                <GoogleLogin
                  onSuccess={async (response) => {
                    if (response.credential) {
                      try {
                        await handleGoogleLogin(response.credential);
                        navigate("/");
                        showToast("Google login successful", "success");
                      } catch (error) {
                        showToast("Google login error", "error");
                      }
                    }
                  }}
                  onError={() => {
                    showToast("Google login error", "error");
                  }}
                />
              </div>



              <p className="mt-6 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:text-primary/80 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </UnprotectedRoute>
  );
}
