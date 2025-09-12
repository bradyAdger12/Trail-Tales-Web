import type { Route } from "./+types/me";
import ProtectedRoute from "~/components/ProtectedRoute";
import { useQuery } from "@tanstack/react-query";
import { fetchGame } from "~/api/game";
import { ErrorAlert } from "~/components/alerts/Alerts";
import GameConfiguration from "~/components/game_configuration/GameConfiguration";
import { GameProvider, useGame } from "~/contexts/GameContext";
import GameMenu from "~/components/game/GameMenu";
import { useEffect } from "react";
import { APP_NAME } from "~/lib/constants";
import { useAuth } from "~/contexts/AuthContext";
export function meta({ }: Route.MetaArgs) {
    return [
        { title: `My Game - ${APP_NAME}` },
        { name: "description", content: "Manage your account settings and preferences" },
    ];
}

export default function Me() {
    const { setGame } = useGame()
    const { token } = useAuth()
    const { data: game, error, isLoading } = useQuery({ queryKey: ['game', token], queryFn: fetchGame, enabled: !!token })
    useEffect(() => {
        if (game) {
            setGame(game)
        }
    }, [game])

    if (error) {
        return <ErrorAlert message={error.message} />
    } else if (isLoading) {
        return <div>Fetching game...</div>
    }
    return (
        <ProtectedRoute>
            <div>
                {!game?.id ? <GameConfiguration /> : <GameMenu game={game} />}
            </div>
        </ProtectedRoute>
    );
}
