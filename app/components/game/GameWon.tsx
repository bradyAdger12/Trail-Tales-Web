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
            setGame(null)
            window.location.reload()
        } catch (error) {
            console.error(error)
        } finally {
            setWaiting(false)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-96 gap-8">
            <div className="text-center">
                <div className="mb-6">
                    <div className="text-6xl mb-4">🎉</div>
                    <h1 className="text-5xl font-bold text-success mb-4 animate-pulse">Victory</h1>
                </div>
                <p className="text-xl text-base-content/90 font-semibold">
                    Congratulations! You survived the island
                </p>
                <p className="text-lg text-base-content/70 mt-2">
                    You've proven yourself as a true survivor against all odds.
                </p>
                <p className="text-sm text-base-content/50 mt-4">
                    Your courage and determination led you to safety!
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    className="btn btn-success btn-lg"
                    onClick={startNewGame}
                    disabled={waiting}
                >
                    Play Again {waiting && <span className="loading loading-spinner loading-xs"></span>}
                </button>
            </div>
        </div>
    )
}