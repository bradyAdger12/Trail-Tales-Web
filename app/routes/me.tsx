import type { Route } from "./+types/me";
import ProtectedRoute from "~/components/ProtectedRoute";
import { useQuery } from "@tanstack/react-query";
import { startGame } from "~/api/game";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "My Account - Epic Adventures" },
        { name: "description", content: "Manage your account settings and preferences" },
    ];
}

export default function Me() {
    const { data: game } = useQuery({ queryKey: ['game'], queryFn: startGame })
    return (
        <ProtectedRoute>
            <div className="flex flex-wrap md:flex-nowrap gap-10">
                {game?.id}
                {/* <Character />
                {currentStory ? <Story story={currentStory} /> : <Stories storyTemplates={storyTemplates || []} />} */}
            </div>
        </ProtectedRoute>
    );
}
