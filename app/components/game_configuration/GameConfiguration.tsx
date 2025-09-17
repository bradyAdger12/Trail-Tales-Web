import { useMutation, useQuery } from "@tanstack/react-query";
import { useGame } from "~/contexts/GameContext";
import { getGameDifficultyOptions, startGame, type GameDifficulty } from "~/api/game";
import { useNavigate } from "react-router";
import { kilometersToMiles, milesToKilometers, secondsToMMSS } from "~/lib/conversions";
import CharacterStat from "../character/CharacterVital";
import { FOOD_COLOR, HEALTH_COLOR, WATER_COLOR } from "~/lib/colors";
import { useState } from "react";
import Integrations from "../integrations/Integrations";
import { useAuth } from "~/contexts/AuthContext";

export default function GameConfiguration() {
    const { setGame } = useGame()
    const { user } = useAuth()
    const [selectedDifficulty, setSelectedDifficulty] = useState<GameDifficulty | null>(null)
    const [wait, setWait] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const usStartGameDisabled = !selectedDifficulty || wait || !user?.strava_access_token
    const { data: gameDifficultyOptions } = useQuery({
        queryKey: ["game_difficulty"],
        queryFn: () => getGameDifficultyOptions()
    })
    const start = useMutation({
        mutationFn: () => {
            setWait(true)
            return startGame({
                difficulty: selectedDifficulty as GameDifficulty
            })
        },
        onSuccess: (response) => {
            setGame(response)
            setWait(false)
            navigate(`/game/${response.id}/survival_day/${response.survival_days[0].id}`)
        },
        onError: (error) => {
            setWait(false)
            setError(error.message)
        },
        meta: {
            timeout: 100000
        }
    })
    return (
        <div className="flex flex-col items-center gap-6">

            <h3 className="text-center">
                Integrations
                <p className="text-sm text-gray-500">
                    Connect your accounts to upload your data to the game
                </p>
            </h3>
            <Integrations />
            <hr />
            <div className="flex flex-col gap-6 w-full md:w-1/2">
                <h3 className="text-center">
                    Difficulty
                    <p className="text-sm text-gray-500">
                        Choose a difficulty to start the game
                    </p>
                </h3>

                {gameDifficultyOptions && Object.keys(gameDifficultyOptions).map((difficulty) => (
                    <div
                        key={difficulty}
                        onClick={() => setSelectedDifficulty(difficulty as GameDifficulty)}
                        className={`p-4 border border-3 rounded-lg cursor-pointer ${selectedDifficulty === difficulty ? 'border-blue-500' : 'border-gray-300 hover:border-blue-300'}`}
                    >
                        {/* Difficulty */}
                        <h3 className="text-sm md:stext-lg font-semibold capitalize mb-2">
                            {difficulty}
                        </h3>
                        <p className="text-sm mb-4">
                            {gameDifficultyOptions[difficulty as GameDifficulty].description}
                        </p>
                        <div className="space-y-2">
                            <CharacterStat stat={gameDifficultyOptions[difficulty as GameDifficulty].health} color={HEALTH_COLOR} icon="fa-solid fa-heart" />
                            <CharacterStat stat={gameDifficultyOptions[difficulty as GameDifficulty].food} color={FOOD_COLOR} icon="fa-solid fa-utensils" />
                            <CharacterStat stat={gameDifficultyOptions[difficulty as GameDifficulty].water} color={WATER_COLOR} icon="fa-solid fa-water" />
                        </div>

                        <div className="flex mt-4 gap-6">
                            <div>
                                <p className="text-xs md:text-xl mb-2">Exploration Duration</p>
                                <div className="flex items-center gap-2 text-md font-semibold">
                                    <span>{gameDifficultyOptions[difficulty as GameDifficulty].minDurationInSeconds / 60}-{gameDifficultyOptions[difficulty as GameDifficulty].maxDurationInSeconds / 60} min</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <button className="btn btn-primary w-full" onClick={() => start.mutate()} disabled={usStartGameDisabled}>Start Game {wait && <i className="fas fa-spinner fa-spin"></i>}</button>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    )
}
