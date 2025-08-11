import { createContext, useContext, useState } from "react";

type GameConfigContextType = {
    config: GameConfig
    setConfig: React.Dispatch<React.SetStateAction<GameConfig>>
}

export type GameDifficulty = 'easy' | 'medium' | 'hard'

export interface GameConfig {
    difficulty: GameDifficulty
}
const GameConfigContext = createContext<GameConfigContextType | undefined>(undefined)

export function GameConfigProvider({ children }: { children: React.ReactNode }) {
    const [config, setConfig] = useState<GameConfig>({} as GameConfig)
    return <GameConfigContext.Provider value={{ config, setConfig }}>
        {children}
    </GameConfigContext.Provider>
}

export function useGameConfig() {
    const context = useContext(GameConfigContext)
    if (!context) {
        throw new Error("useGameConfig must be used within a GameConfigProvider")
    }
    return context
}