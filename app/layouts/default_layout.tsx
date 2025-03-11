import { Link, useNavigate } from "react-router";
import { useAuth } from "~/contexts/AuthContext";
import { APP_NAME } from "~/lib/constants";

export default function DefaultLayout({ children, className }: { children: React.ReactNode, className?: string }) {
    const { isAuthenticated, logout } = useAuth();
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
                                    {!isAuthenticated && <li><Link to="/login">Login</Link></li>}
                                    {isAuthenticated && <li><span onClick={() => {
                                        logout();
                                        navigate("/");
                                    }}>Logout</span></li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container mx-auto mt-12 h-screen">
                <div className="absolute inset-0 bg-[url('/app/assets/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 opacity-20 blur-3xl pointer-events-none"></div>
                {children}
            </div>
            <footer>
                <div className="container mx-auto">
                    <h1>Footer</h1>
                </div>
            </footer>
        </div>
    );
}
