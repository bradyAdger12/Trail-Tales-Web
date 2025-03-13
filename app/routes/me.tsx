import { redirect } from "react-router";
import type { Route } from "./+types/me";
import ProtectedRoute from "~/components/ProtectedRoute";
import Stories from "~/components/story/Stories";
import { fetchCurrentStory, fetchStoryTemplates } from "~/models/story";
export function meta({ }: Route.MetaArgs) {
    return [
        { title: "My Account - Epic Adventures" },
        { name: "description", content: "Manage your account settings and preferences" },
    ];
}

export function HydrateFallback() {
    return <div>Loading...</div>;
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const [storyTemplates, currentStory] = await Promise.all([
        fetchStoryTemplates().catch(() => {}),
        fetchCurrentStory().catch(() => {})
    ])
    if (currentStory) {
        console.log("currentStory", currentStory)
        return redirect(`/story/${currentStory.id}`);
    }
    return { storyTemplates };
}

export default function Me() {
    return (
        <ProtectedRoute>
            <Stories />
        </ProtectedRoute>
    );
}
