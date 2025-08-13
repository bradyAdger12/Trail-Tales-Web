import { createContext, useContext, useState } from "react";
import type { Game } from "~/api/game";

type GameContextType = {
    game: Game
    setGame: React.Dispatch<React.SetStateAction<Game>>
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [game, setGame] = useState<Game>({} as Game)
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