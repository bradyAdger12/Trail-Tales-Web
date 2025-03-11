import DefaultLayout from "~/layouts/default_layout";
import type { Route } from "./+types/about";
import { useAuth } from "~/contexts/AuthContext";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function About() {
    const { user } = useAuth();
    return <DefaultLayout>
        <div>About</div>
        <div>
            <h1>{user?.display_name}</h1>
            <p>{user?.email}</p>
        </div>
    </DefaultLayout>;
}
