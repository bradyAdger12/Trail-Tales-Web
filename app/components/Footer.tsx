import { Link } from "react-router";
import { APP_NAME } from "~/lib/constants";

export default function Footer() {
    return <footer className="border-t border-gray-700 py-4">
        <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-x-3 mb-4 md:mb-0">
                    <img src="https://trail-tales-ba-3013.s3.us-west-2.amazonaws.com/web_assets/logo.png" alt="logo" className="w-8 rounded-full" />
                    <p className="text-lg font-semibold">{APP_NAME}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm text-gray-400">
                    <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                    <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    <div>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</div>
                </div>
            </div>
        </div>
    </footer>
}

