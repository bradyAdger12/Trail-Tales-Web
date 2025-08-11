import { useMutation, useQueryClient } from "@tanstack/react-query";
import GameDifficulty from "./GameDifficulty";
import { GameConfigProvider, useGameConfig } from "~/contexts/GameConfigContext";
import { fetchGame, startGame } from "~/api/game";

export default function GameConfiguration() {
    const { config } = useGameConfig()
    const client = useQueryClient()
    const start = useMutation({
        mutationFn: startGame,
        onSuccess: () => client.invalidateQueries({ queryKey: ['game'] })
    })
    return (
        <div>
            <h1>Select Difficulty</h1>
            <p className="mt-2">
                Select a difficulty to start your adventure
            </p>
            <GameDifficulty />
            <div className="mt-10">
                {config.difficulty && <button className="btn btn-primary" onClick={() => start.mutate(config.difficulty)}>Start</button>}
            </div>
        </div>
    )
}
