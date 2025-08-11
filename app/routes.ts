import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes"

export default [
    layout("./layouts/default_layout.tsx", [
        index("routes/home.tsx"),
        route("/login", "routes/login.tsx"),
        route("/signup", "routes/signup.tsx"),
        route("/reset-password", "routes/reset-password.tsx"),
        route("/contact", "routes/contact.tsx"),

    ]),

    layout("./layouts/auth_layout.tsx", [
        route("/me", "routes/me.tsx"),
        route("/profile", "routes/profile.tsx"),
        ...prefix("chapter", [
            route("/:chapterId", "routes/chapter.tsx")
        ]),
        ...prefix("integration", [
            route("/strava", "routes/integration/strava.tsx")
        ]),
        ...prefix("game/:gameId/survival_day", [
            route("/:survivalDayId", "routes/survival_day.tsx")
        ])
    ])

] satisfies RouteConfig;
