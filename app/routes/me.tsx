import { redirect, useLoaderData } from "react-router";
import type { Route } from "./+types/me";
import ProtectedRoute from "~/components/ProtectedRoute";
import Stories from "~/components/story/Stories";
import { fetchCurrentStory, fetchStoryTemplates } from "~/api/story";
import Story from "~/components/story/Story";
import { useAuth } from "~/contexts/AuthContext";
import Character from "~/components/character/Character";
export function meta({ }: Route.MetaArgs) {
    return [
        { title: "My Account - Epic Adventures" },
        { name: "description", content: "Manage your account settings and preferences" },
    ];
}

export function HydrateFallback() {
    return <span className="loading loading-spinner loading-lg"></span>;
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const [storyTemplates, currentStory] = await Promise.all([
        fetchStoryTemplates().catch(() => { }),
        fetchCurrentStory().catch(() => { })
    ])
    return { storyTemplates, currentStory };
}

export default function Me() {
    const { storyTemplates, currentStory } = useLoaderData<typeof clientLoader>();
    return (
        <ProtectedRoute>
            <div className="flex flex-wrap md:flex-nowrap gap-10">
                <Character />
                {currentStory ? <Story story={currentStory} /> : <Stories />}
            </div>
        </ProtectedRoute>
    );
}
