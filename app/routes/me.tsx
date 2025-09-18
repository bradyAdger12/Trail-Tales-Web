import type { Route } from "./+types/me";
import ProtectedRoute from "~/components/ProtectedRoute";
import { useQuery } from "@tanstack/react-query";
import { fetchGame } from "~/api/game";
import { ErrorAlert } from "~/components/alerts/Alerts";
import GameConfiguration from "~/components/game_configuration/GameConfiguration";
import { useGame } from "~/contexts/GameContext";
import GameMenu from "~/components/game/GameMenu";
import { useEffect } from "react";
import { APP_NAME } from "~/lib/constants";
import { useAuth } from "~/contexts/AuthContext";
import GameLost from "~/components/game/GameLost";
import GameWon from "~/components/game/GameWon";
export function meta({ }: Route.MetaArgs) {
    return [
        { title: `My Game - ${APP_NAME}` },
        { name: "description", content: "Manage your account settings and preferences" },
    ];
}

export default function Me() {
    const { game, gameLoading } = useGame()
    const renderGameState = () => {
        if (game?.status === 'active') {
            return <GameMenu game={game} />
        } else if (game?.status === 'lost') {
            return <GameLost />
        } else if (game?.status === 'won') {
            return <GameWon />
        }
    }

    return (
        <ProtectedRoute>
            {gameLoading ?
                <div>Loading...</div> :
                <div>
                    {!game?.id ? <GameConfiguration /> : renderGameState()}
                </div>
            }
        </ProtectedRoute>
    );
}
