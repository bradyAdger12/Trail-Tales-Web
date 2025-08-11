import type { Route } from "./+types/me";
import ProtectedRoute from "~/components/ProtectedRoute";
import { useQuery } from "@tanstack/react-query";
import { fetchGame } from "~/api/game";
import { ErrorAlert } from "~/components/alerts/Alerts";
import GameConfiguration from "~/components/game_configuration/GameConfiguration";
import { GameConfigProvider } from "~/contexts/GameConfigContext";
import GameMenu from "~/components/game/GameMenu";
export function meta({ }: Route.MetaArgs) {
    return [
        { title: "My Account - Epic Adventures" },
        { name: "description", content: "Manage your account settings and preferences" },
    ];
}

export default function Me() {
    const { data: game, error, isLoading } = useQuery({ queryKey: ['game'], queryFn: fetchGame })
    if (error) {
        return <ErrorAlert message={error.message} />
    } else if (isLoading) {
        return <div>Fetching game...</div>
    }
    return (
        <ProtectedRoute>
            <GameConfigProvider>
                <div>
                    {!game?.id ? <GameConfiguration /> : <GameMenu game={game} />}
                </div>
            </GameConfigProvider>
        </ProtectedRoute>
    );
}
