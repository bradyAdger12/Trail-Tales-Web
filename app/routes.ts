import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes"

export default [
    layout("./layouts/default_layout.tsx", [
        index("routes/home.tsx"),
        route("/login", "routes/login.tsx"),
        route("/signup", "routes/signup.tsx"),
        route("/me", "routes/me.tsx"),
        route("/reset-password", "routes/reset-password.tsx"),
        route("/contact", "routes/contact.tsx"),
        ...prefix("chapter", [
            route("/:chapterId", "routes/chapter.tsx")
        ])
    ]),

] satisfies RouteConfig;
