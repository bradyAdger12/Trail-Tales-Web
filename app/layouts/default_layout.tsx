import { useCookies } from "react-cookie";
import { Link, Outlet, useNavigate } from "react-router";
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
                                    <img src="https://trail-tales-ba-3013.s3.us-west-2.amazonaws.com/web_assets/logo.png" alt="logo" className="w-12 rounded-full" />
                                    <h4 className="text-2xl font-bold">
                                        {APP_NAME}
                                    </h4>
                                </Link>
                            </div>
                            <div>
                                <ul className="menu menu-horizontal">
                                    {!cookies.token && <li><Link to="/login">Login</Link></li>}
                                    {cookies.token && <li><span onClick={() => {
                                        logout();
                                        navigate("/");
                                    }}>Logout</span></li>}
                                    <li><Link to="/how-to-play">How to Play</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container mx-auto my-12 px-6 md:px-0 min-h-screen">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
