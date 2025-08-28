import { createContext, useContext, useEffect, useState } from "react";
import type { Game, GameNotification } from "~/api/game";
import { getGameNotifications } from "~/api/game";
import { useDialog } from "./DialogContext";
import { GameNotificationDialog } from "~/components/dialogs/GameNotificationDialog";

type GameContextType = {
    game: Game
    setGame: React.Dispatch<React.SetStateAction<Game>>
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [game, setGame] = useState<Game>({} as Game)
    const { openDialog } = useDialog()
    const [notifications, setNotifications] = useState<GameNotification[]>([])

    useEffect(() => {
        if (!game.id) return
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