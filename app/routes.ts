import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    route("signup", "routes/signup.tsx"),
    route("me", "routes/me.tsx"),
    route("reset-password", "routes/reset-password.tsx"),
    route("contact", "routes/contact.tsx")
] satisfies RouteConfig;
