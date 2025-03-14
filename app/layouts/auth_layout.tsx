import { useCookies } from "react-cookie";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import Footer from "~/components/Footer";
import { useAuth } from "~/contexts/AuthContext";
import { APP_NAME } from "~/lib/constants";

export default function DefaultLayout({ className }: { className?: string }) {
    const { isAuthenticated, logout } = useAuth();
    const [cookies, setCookie] = useCookies(['token', 'refreshToken', 'user']);
    const navigate = useNavigate();
    return (
        <div className={className}>
            <header className="border-b border-gray-700">
                <nav className="navbar">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-center">
                            <div>
                                <Link to="/" className="flex items-center gap-x-3 cursor-pointer">
                                    <img src="/app/assets/images/logo.png" alt="logo" className="w-12 rounded-full" />
                                    <p className="text-2xl font-bold">
                                        {APP_NAME}
                                    </p>
                                </Link>
                            </div>
                            <div>
                                <ul className="menu menu-horizontal">
                                    {!cookies.token && <li><Link to="/login">Login</Link></li>}
                                    {cookies.token &&
                                        <ul className="flex gap-x-4">
                                            <li><NavLink to="/me" className={({ isActive }) => isActive ? 'text-primary' : ''}>My Adventures</NavLink></li>
                                            <li><NavLink to="/profile" className={({ isActive }) => isActive ? 'text-primary' : ''}>Profile</NavLink></li>
                                            <li><span onClick={() => {
                                                logout();
                                                navigate("/");
                                            }}>Logout</span></li>

                                        </ul>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container mx-auto my-12 px-6 md:px-0 min-h-screen">
                <div className="absolute inset-0 bg-[url('/app/assets/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 opacity-20 blur-3xl pointer-events-none"></div>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
