import { redirect, useLoaderData } from "react-router";
import type { Route } from "./+types/me";
import ProtectedRoute from "~/components/ProtectedRoute";
import Stories from "~/components/story/Stories";
import { fetchCurrentStory, fetchStoryTemplates } from "~/models/story";
import Story from "~/components/story/Story";
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
    return { storyTemplates, currentStory };
}

export default function Me() {
    const { storyTemplates, currentStory } = useLoaderData<typeof clientLoader>();
    return (
        <ProtectedRoute>
            {currentStory ? <Story story={currentStory} /> : <Stories />}
        </ProtectedRoute>
    );
}
