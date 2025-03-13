import { type RouteConfig, index, layout, route } from "@react-router/dev/routes"

export default [
    layout("./layouts/default_layout.tsx", [
        index("routes/home.tsx"),
        route("/login", "routes/login.tsx"),
        route("/signup", "routes/signup.tsx"),
        route("/me", "routes/me.tsx"),
        route("/story/:storyId", "routes/story/story.tsx"),
        route("/reset-password", "routes/reset-password.tsx"),
        route("/contact", "routes/contact.tsx")
    ]),

] satisfies RouteConfig;
