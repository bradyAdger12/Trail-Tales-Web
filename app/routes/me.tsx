import DefaultLayout from "~/layouts/default_layout";
import type { Route } from "./+types/me";
import { useAuth } from "~/contexts/AuthContext";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "My Account - Epic Adventures" },
        { name: "description", content: "Manage your account settings and preferences" },
    ];
}

export default function Me() {
    const { user } = useAuth();
    return <DefaultLayout>
        <div>//TODO: Create App</div>
    </DefaultLayout>;
}
