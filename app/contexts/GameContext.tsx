import { createContext, useContext, useEffect, useState } from "react";
import type { Game } from "~/api/game";
import { fetchGame, fetchUnseenGameNotifications } from "~/api/game";
import { useDialog } from "./DialogContext";
import { GameNotificationDialog } from "~/components/dialogs/GameNotificationDialog";

type GameContextType = {
    game: Game | null
    gameLoading: boolean
    setGame: React.Dispatch<React.SetStateAction<Game | null>>
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [game, setGame] = useState<Game | null>(null)
    const { openDialog } = useDialog()
    const [gameLoading, setGameLoading] = useState(true)

    useEffect(() => {
        setGameLoading(true)
        fetchGame().then((response) => {
            setGame(response)
            setGameLoading(false)
        })
    }, [])

    useEffect(() => {
        if (!game?.id) return
        fetchUnseenGameNotifications(game.id).then((response) => {
            if (response.length > 0) {
                openDialog(<GameNotificationDialog notifications={response} game_id={game.id} />)
            }
        })
    }, [game])

    return <GameContext.Provider value={{ game, setGame, gameLoading }}>
        {children}
    </GameContext.Provider>
}

export function useGame() {
    const context = useContext(GameContext)
    if (!context) {
        throw new Error("useGame must be used within a GameProvider")
    }
    return context
}