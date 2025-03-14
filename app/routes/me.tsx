import { redirect, useLoaderData } from "react-router";
import type { Route } from "./+types/me";
import ProtectedRoute from "~/components/ProtectedRoute";
import Stories from "~/components/story/Stories";
import { fetchCurrentStory, fetchStoryTemplates } from "~/api/story";
import Story from "~/components/story/Story";
import Character from "~/components/character/Character";
import { useQuery } from "@tanstack/react-query";
export function meta({ }: Route.MetaArgs) {
    return [
        { title: "My Account - Epic Adventures" },
        { name: "description", content: "Manage your account settings and preferences" },
    ];
}

export default function Me() {
    // const { storyTemplates, currentStory } = useLoaderData<typeof clientLoader>();
    const { data: storyTemplates } = useQuery({ queryKey: ['story_templates'], queryFn: fetchStoryTemplates })
    const { data: currentStory } = useQuery({ queryKey: ['current_story'], queryFn: fetchCurrentStory })
    return (
        <ProtectedRoute>
            <div className="flex flex-wrap md:flex-nowrap gap-10">
                <Character />
                {currentStory ? <Story story={currentStory} /> : <Stories storyTemplates={storyTemplates || []} />}
            </div>
        </ProtectedRoute>
    );
}
