import { resetGame } from "~/api/game";
import { useGame } from "~/contexts/GameContext";
import { useState } from "react";
import { useNavigate } from "react-router";
export default function GameLost() {
    const { setGame, game } = useGame()
    const [waiting, setWaiting] = useState(false)
    async function startNewGame() {
        try {
            setWaiting(true)
            await resetGame(game?.id || '')
            window.location.reload()
        } catch (error) {
            console.error(error)
        } finally {
            setWaiting(false)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-96 gap-6">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-error mb-4">Game Over</h1>
                <p className="text-lg text-base-content/70">
                    You didn't survive this time.
                </p>
                <p className="text-sm text-base-content/50 mt-2">
                    Better luck next time!
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <button
                    className="btn btn-primary btn-lg"
                    onClick={startNewGame}
                    disabled={waiting}
                >
                    Start New Game {waiting && <span className="loading loading-spinner loading-xs"></span>}
                </button>
            </div>
        </div>
    )
}