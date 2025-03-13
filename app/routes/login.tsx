import DefaultLayout from "~/layouts/default_layout";
import type { Route } from "./+types/home";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "~/contexts/AuthContext";
import { APP_NAME } from "~/lib/constants";
import { useDialog } from "~/contexts/DialogContext";
import { ForgotPasswordDialog } from "~/components/dialogs/ForgotPasswordDialog";
import UnprotectedRoute from "~/components/UnprotectedRoute";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: `Login - ${APP_NAME}` },
    { name: "description", content: `Log in to your ${APP_NAME} account and continue your adventure.` },
  ];
}

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [signinLoading, setSigninLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { openDialog } = useDialog();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSigninLoading(true);
      await login({
        email: formData.email,
        password: formData.password
      })
      navigate("/me");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSigninLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
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
                  Welcome Back
                </h1>
                <p className="text-gray-400">Continue your adventure</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800/60 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white placeholder-gray-400"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <span className="text-sm text-primary hover:text-primary/80 transition-colors cursor-pointer" onClick={() => openDialog(<ForgotPasswordDialog />)}>
                      Forgot password?
                    </span>
                  </div>
                  <div className="w-full flex items-center bg-gray-800/60 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-white placeholder-gray-400">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2"
                      placeholder="••••••••"
                      required
                    />
                    {<span className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400/40 cursor-pointer mr-3`} onClick={() => setShowPassword(!showPassword)} />}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-700/50 bg-gray-800/60 text-primary focus:ring-primary/50"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-400">
                    Remember me
                  </label>
                </div>

                {error && (
                  <div className="text-red-500 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full btn btn-primary text-black px-8 py-3 text-lg font-semibold"
                >
                  Sign in {signinLoading && <span className="loading loading-spinner loading-xs"></span>}
                </button>
              </form>

              <p className="mt-6 text-center text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:text-primary/80 transition-colors">
                  Sign up
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </UnprotectedRoute>
  );
}
