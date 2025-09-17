import { createContext, useContext, useEffect, useState } from "react";
import type { Game } from "~/api/game";
import { fetchGame, getGameNotifications } from "~/api/game";
import { useDialog } from "./DialogContext";
import { GameNotificationDialog } from "~/components/dialogs/GameNotificationDialog";

type GameContextType = {
    game: Game | null
    setGame: React.Dispatch<React.SetStateAction<Game | null>>
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [game, setGame] = useState<Game | null>(null)
    const { openDialog } = useDialog()

    useEffect(() => {
        fetchGame().then((response) => {
            setGame(response)
        })
    }, [])

    useEffect(() => {
        if (!game?.id) return
        getGameNotifications(game.id).then((response) => {
            if (response.length > 0) {
                openDialog(<GameNotificationDialog notifications={response} game_id={game.id} />)
            }
        })
    }, [game])

    return <GameContext.Provider value={{ game, setGame }}>
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