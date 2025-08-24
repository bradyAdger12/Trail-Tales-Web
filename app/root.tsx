import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./assets/css/app.css";
import { ToastProvider } from "./contexts/ToastContext";
import { AuthProvider } from "./contexts/AuthContext";
import { DialogProvider } from "./contexts/DialogContext";
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GameProvider } from "./contexts/GameContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Bangers&display=swa",
  },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap' },
  { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css' }

];

export function Layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <CookiesProvider defaultSetOptions={{ path: '/' }}>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>
                <DialogProvider>
                  <ToastProvider>
                    <GameProvider>
                      {children}
                    </GameProvider>
                  </ToastProvider>
                </DialogProvider>
              </AuthProvider>
            </QueryClientProvider>
          </CookiesProvider>
        </GoogleOAuthProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      {isRouteErrorResponse(error) && error.status === 404 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <div className="relative mb-8">
            <img
              src="/app/assets/images/lost-traveler.svg"
              alt="Lost traveler"
              className="w-64 h-64 opacity-80"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-400 max-w-md mb-8">
            The page you're looking for doesn't exist or has been moved to another location.
          </p>
          <Link
            to="/"
            className="btn btn-primary btn-lg gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Return Home
          </Link>
        </div>
      ) : <div>
        <h1>{message}</h1>
        <p>{details}</p>
        {stack && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}
      </div>}

    </main>
  );
}
