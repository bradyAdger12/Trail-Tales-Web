import { useCookies } from "react-cookie";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import Footer from "~/components/Footer";
import { useAuth } from "~/contexts/AuthContext";
import { APP_NAME } from "~/lib/constants";
import { useState } from "react";

export default function DefaultLayout({ className }: { className?: string }) {
    const { isAuthenticated, logout } = useAuth();
    const [cookies, setCookie] = useCookies(['token', 'refreshToken', 'user']);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

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
                            
                            {/* Desktop Menu */}
                            <div className="hidden md:block">
                                <ul className="menu menu-horizontal">
                                    {!cookies.token && <li><Link to="/login">Login</Link></li>}
                                    {cookies.token &&
                                        <ul className="flex gap-x-4">
                                            <li><NavLink to="/me" className={({ isActive }) => isActive ? 'text-primary' : ''}>My Game</NavLink></li>
                                            <li><NavLink to="/how-to-play" className={({ isActive }) => isActive ? 'text-primary' : ''}>How to Play</NavLink></li>
                                            <li><NavLink to="/profile" className={({ isActive }) => isActive ? 'text-primary' : ''}>Profile</NavLink></li>
                                            <li><NavLink to="/" onClick={() => {
                                                logout();
                                            }}>Logout</NavLink></li>
                                        </ul>
                                    }
                                </ul>
                            </div>

                            {/* Mobile Hamburger Button */}
                            <div className="md:hidden">
                                <button
                                    onClick={toggleMobileMenu}
                                    className="p-2 rounded-md hover:bg-gray-700 transition-colors"
                                    aria-label="Toggle mobile menu"
                                >
                                    <div className="w-6 h-6 flex flex-col justify-center items-center">
                                        <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                                        <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                                        <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu */}
                        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="py-4 border-t border-gray-700 mt-4">
                                <ul className="flex flex-col gap-y-2">
                                    {!cookies.token && (
                                        <li>
                                            <Link 
                                                to="/login" 
                                                className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Login
                                            </Link>
                                        </li>
                                    )}
                                    {cookies.token && (
                                        <>
                                            <li>
                                                <NavLink 
                                                    to="/me" 
                                                    className={({ isActive }) => `block py-2 px-4 hover:bg-gray-700 rounded transition-colors ${isActive ? 'text-primary' : ''}`}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    My Game
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink 
                                                    to="/how-to-play" 
                                                    className={({ isActive }) => `block py-2 px-4 hover:bg-gray-700 rounded transition-colors ${isActive ? 'text-primary' : ''}`}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    How to Play
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink 
                                                    to="/profile" 
                                                    className={({ isActive }) => `block py-2 px-4 hover:bg-gray-700 rounded transition-colors ${isActive ? 'text-primary' : ''}`}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                >
                                                    Profile
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink 
                                                    to="/" 
                                                    className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors"
                                                    onClick={() => {
                                                        logout();
                                                        setIsMobileMenuOpen(false);
                                                    }}
                                                >
                                                    Logout
                                                </NavLink>
                                            </li>
                                        </>
                                    )}
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
